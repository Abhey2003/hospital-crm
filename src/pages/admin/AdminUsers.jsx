import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  // 🔥 REAL-TIME FETCH
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  // ❌ DELETE USER
  const handleDelete = async (id, role) => {
    if (role === "admin") {
      alert("Cannot delete admin ❌");
      return;
    }

    await deleteDoc(doc(db, "users", id));
  };

  // 🔄 UPDATE ROLE
  const handleRoleChange = async (id, newRole) => {
    await updateDoc(doc(db, "users", id), {
      role: newRole
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-6">
        User Management
      </h1>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Change Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-3 break-all">{u.email}</td>

                <td className="p-3 font-semibold">{u.role}</td>

                <td className="p-3">
                  {u.role !== "admin" && (
                    <select
                      value={u.role}
                      onChange={(e) =>
                        handleRoleChange(u.id, e.target.value)
                      }
                      className="border p-2 rounded"
                    >
                      <option value="doctor">Doctor</option>
                      <option value="patient">Patient</option>
                    </select>
                  )}
                </td>

                <td className="p-3">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(u.id, u.role)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 MOBILE CARD VIEW */}
      <div className="md:hidden flex flex-col gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <p className="text-sm text-gray-500">Email</p>
            <p className="break-all mb-2">{u.email}</p>

            <p className="text-sm text-gray-500">Role</p>
            <p className="font-semibold mb-2">{u.role}</p>

            {u.role !== "admin" && (
              <>
                <select
                  value={u.role}
                  onChange={(e) =>
                    handleRoleChange(u.id, e.target.value)
                  }
                  className="w-full border p-2 rounded mb-2"
                >
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>

                <button
                  onClick={() => handleDelete(u.id, u.role)}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminUsers;