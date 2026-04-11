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
    setMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-md px-4 py-3 relative w-full overflow-hidden">

      {/* TOP BAR */}
      <div className="flex justify-between items-center w-full">
        
        {/* LOGO */}
        <h1 className="text-lg font-bold text-blue-600 truncate">
          Hospital CRM
        </h1>

        {/* 🍔 MOBILE BUTTON */}
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

              {/* EMAIL FIX */}
              <span className="text-sm text-gray-600 truncate max-w-[120px]">
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

      {/* 📱 MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t z-50 p-4 flex flex-col gap-3 md:hidden">
          
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