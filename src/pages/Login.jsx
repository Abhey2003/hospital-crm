import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      if (docSnap.exists()) {
        const role = docSnap.data().role;

        // 🔐 BLOCK ADMIN HERE
        if (role === "admin") {
          alert("Admins must login from Admin Panel ❌");
          return;
        }

        // ✅ NORMAL USERS
        if (role === "doctor") navigate("/doctor");
        else if (role === "patient") navigate("/patient");
        else alert("Invalid role");
      } else {
        alert("User role not found ❌");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md w-full max-w-sm sm:max-w-md">
        
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6 text-blue-600">
          Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          className="w-full border p-2.5 sm:p-3 rounded mb-3 sm:mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative mb-3 sm:mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            className="w-full border p-2.5 sm:p-3 rounded pr-16 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-xs sm:text-sm text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2.5 sm:py-3 rounded text-sm sm:text-base text-white transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* LINKS */}
        <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
          Not registered?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>

        {/* ADMIN LOGIN */}
        <p className="text-center mt-2 text-xs sm:text-sm text-gray-500">
          Admin?{" "}
          <Link to="/admin-login" className="text-red-500 hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;