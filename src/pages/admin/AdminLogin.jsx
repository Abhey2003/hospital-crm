import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().role === "admin") {
        navigate("/admin");
      } else {
        alert("Access denied ❌ (Not Admin)");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md w-full max-w-sm sm:max-w-md">
        
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6 text-red-500">
          Admin Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full border p-2.5 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full border p-2.5 sm:p-3 rounded mb-4 sm:mb-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2.5 sm:py-3 rounded text-sm sm:text-base text-white transition ${
            loading
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Logging in..." : "Login as Admin"}
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;