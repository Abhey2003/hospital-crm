import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    disease: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "patients"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPatients(data);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.age || !form.disease) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "patients", editId), form);
        setEditId(null);
      } else {
        await addDoc(collection(db, "patients"), form);
      }

      setForm({ name: "", age: "", disease: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (patient) => {
    setForm({
      name: patient.name,
      age: patient.age,
      disease: patient.disease
    });
    setEditId(patient.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "patients", id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-5 sm:mb-6">
        Patients Management
      </h1>

      {/* FORM CARD */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-5 sm:mb-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2.5 sm:p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="border p-2.5 sm:p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="disease"
            placeholder="Disease"
            value={form.disease}
            onChange={handleChange}
            className="border p-2.5 sm:p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full sm:w-auto bg-blue-500 text-white px-5 py-2.5 rounded text-sm sm:text-base hover:bg-blue-600 transition"
        >
          {editId ? "Update Patient" : "Add Patient"}
        </button>

      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Disease</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.age}</td>
                <td className="p-3">{p.disease}</td>
                <td className="p-3 flex gap-2">
                  
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* 📱 MOBILE CARDS */}
      <div className="md:hidden flex flex-col gap-4">
        {patients.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <p className="text-sm text-gray-500">Name</p>
            <p className="mb-2">{p.name}</p>

            <p className="text-sm text-gray-500">Age</p>
            <p className="mb-2">{p.age}</p>

            <p className="text-sm text-gray-500">Disease</p>
            <p className="mb-3">{p.disease}</p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Patients;