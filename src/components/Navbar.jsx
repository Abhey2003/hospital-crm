import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ NEW

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
    <div className="bg-white shadow-md px-4 py-3">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold text-blue-600">
          Hospital CRM
        </h1>

        {/* 🍔 HAMBURGER (mobile only) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          ) : (
            <>
              {role === "admin" && (
                <>
                  <Link className="nav-link" to="/admin">Dashboard</Link>
                  <Link className="nav-link" to="/admin/patients">Patients</Link>
                  <Link className="nav-link" to="/admin/appointments">Appointments</Link>
                </>
              )}

              {role === "doctor" && (
                <Link className="nav-link" to="/doctor">Doctor Dashboard</Link>
              )}

              {role === "patient" && (
                <Link className="nav-link" to="/patient">Patient Dashboard</Link>
              )}

              <span className="text-gray-600 text-sm truncate max-w-[150px]">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-4 md:hidden">
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              {role === "admin" && (
                <>
                  <Link to="/admin">Dashboard</Link>
                  <Link to="/admin/patients">Patients</Link>
                  <Link to="/admin/appointments">Appointments</Link>
                </>
              )}

              {role === "doctor" && (
                <Link to="/doctor">Doctor Dashboard</Link>
              )}

              {role === "patient" && (
                <Link to="/patient">Patient Dashboard</Link>
              )}

              <span className="text-sm break-all">{user.email}</span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;