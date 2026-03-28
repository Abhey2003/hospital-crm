import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-blue-600">
          Hospital CRM
        </h1>

        {!user ? (
          <>
            <Link className="text-gray-600 hover:text-blue-500" to="/login">
              Login
            </Link>
            <Link className="text-gray-600 hover:text-blue-500" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            {/* ADMIN */}
            {role === "admin" && (
              <>
                <Link className="nav-link" to="/admin">Dashboard</Link>
                <Link className="nav-link" to="/admin/patients">Patients</Link>
                <Link className="nav-link" to="/admin/appointments">Appointments</Link>
              </>
            )}

            {/* DOCTOR */}
            {role === "doctor" && (
              <Link className="nav-link" to="/doctor">
                Doctor Dashboard
              </Link>
            )}

            {/* PATIENT */}
            {role === "patient" && (
              <Link className="nav-link" to="/patient">
                Patient Dashboard
              </Link>
            )}
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            {user.email}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;