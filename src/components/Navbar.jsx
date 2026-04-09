import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false); // ✅ close menu
  };

  return (
    <div className="bg-white shadow-md px-4 py-3 relative">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        
        <h1 className="text-lg sm:text-xl font-bold text-blue-600 truncate">
          Hospital CRM
        </h1>

        {/* 🍔 BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* 💻 DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 overflow-hidden">
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

              <span className="text-gray-600 text-sm truncate max-w-[120px]">
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

      {/* 📱 MOBILE MENU (FULL WIDTH DROPDOWN) */}
      {menuOpen && (
        <div className="absolute left-0 top-full w-full bg-white shadow-md border-t p-4 flex flex-col gap-3 md:hidden z-50">
          
          {!user ? (
            <>
              <Link onClick={() => setMenuOpen(false)} to="/login">Login</Link>
              <Link onClick={() => setMenuOpen(false)} to="/register">Register</Link>
            </>
          ) : (
            <>
              {role === "admin" && (
                <>
                  <Link onClick={() => setMenuOpen(false)} to="/admin">Dashboard</Link>
                  <Link onClick={() => setMenuOpen(false)} to="/admin/patients">Patients</Link>
                  <Link onClick={() => setMenuOpen(false)} to="/admin/appointments">Appointments</Link>
                </>
              )}

              {role === "doctor" && (
                <Link onClick={() => setMenuOpen(false)} to="/doctor">Doctor Dashboard</Link>
              )}

              {role === "patient" && (
                <Link onClick={() => setMenuOpen(false)} to="/patient">Patient Dashboard</Link>
              )}

              <span className="text-sm break-all text-gray-600">
                {user.email}
              </span>

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