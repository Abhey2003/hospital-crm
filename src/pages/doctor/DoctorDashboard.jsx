import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  const [updates, setUpdates] = useState({});
  const [medicineInputs, setMedicineInputs] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchAppointments = async () => {
    const snapshot = await getDocs(collection(db, "appointments"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    const filtered = data.filter(
      (a) => a.doctorId === user?.uid
    );

    setAppointments(filtered);
  };

  useEffect(() => {
    if (user) fetchAppointments();
  }, [user]);

  const handleChange = (id, field, value) => {
    setUpdates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const addMedicineRow = (id) => {
    setMedicineInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        medicines: [...(prev[id]?.medicines || []), {}]
      }
    }));
  };

  const handleMedicineChange = (id, index, field, value) => {
    setMedicineInputs((prev) => {
      const existing = prev[id]?.medicines || [];
      const updated = [...existing];

      updated[index] = {
        ...updated[index],
        [field]: value
      };

      return {
        ...prev,
        [id]: {
          ...prev[id],
          medicines: updated
        }
      };
    });
  };

  const handleSave = async (id) => {
    const data = updates[id];
    const meds = medicineInputs[id]?.medicines || [];

    const ref = doc(db, "appointments", id);

    await updateDoc(ref, {
      prescription: {
        medicines: meds,
        diet: data?.diet || "",
        avoid: data?.avoid || "",
        notes: data?.notes || ""
      },
      progress: data?.progress || "",
      status: "completed"
    });

    alert("Prescription sent to patient ✅");
    fetchAppointments();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Doctor Dashboard
      </h1>

      {appointments.length === 0 && (
        <p className="text-gray-500">No patients assigned</p>
      )}

      <div className="grid gap-6">
        {appointments.map((a) => (
          <div
            key={a.id}
            className="bg-white p-6 rounded-xl shadow-md border"
          >
            {/* HEADER */}
            <div className="mb-4">
              <p className="text-lg font-semibold text-blue-600">
                {a.patientEmail}
              </p>
              <p className="text-gray-600">Disease: {a.disease}</p>
              <p className="text-sm text-gray-500">
                Status: {a.status}
              </p>
            </div>

            {/* MEDICINES */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Medicines</h3>

              <button
                onClick={() => addMedicineRow(a.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded mb-3 hover:bg-blue-600"
              >
                + Add Medicine
              </button>

              {(medicineInputs[a.id]?.medicines || []).map((med, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                  <input
                    placeholder="Name"
                    className="border p-2 rounded"
                    onChange={(e) =>
                      handleMedicineChange(a.id, index, "name", e.target.value)
                    }
                  />

                  <select
                    className="border p-2 rounded"
                    onChange={(e) =>
                      handleMedicineChange(a.id, index, "dose", e.target.value)
                    }
                  >
                    <option value="">Dose</option>
                    <option value="1 time/day">1/day</option>
                    <option value="2 times/day">2/day</option>
                    <option value="3 times/day">3/day</option>
                  </select>

                  <input
                    placeholder="Duration"
                    className="border p-2 rounded"
                    onChange={(e) =>
                      handleMedicineChange(a.id, index, "duration", e.target.value)
                    }
                  />

                  <input
                    placeholder="Timing"
                    className="border p-2 rounded"
                    onChange={(e) =>
                      handleMedicineChange(a.id, index, "timing", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* DIET */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                placeholder="Diet (what to eat)"
                className="border p-2 rounded"
                onChange={(e) =>
                  handleChange(a.id, "diet", e.target.value)
                }
              />

              <input
                placeholder="Avoid"
                className="border p-2 rounded"
                onChange={(e) =>
                  handleChange(a.id, "avoid", e.target.value)
                }
              />
            </div>

            {/* NOTES */}
            <input
              placeholder="Notes"
              className="border p-2 rounded w-full mb-4"
              onChange={(e) =>
                handleChange(a.id, "notes", e.target.value)
              }
            />

            {/* PROGRESS */}
            <input
              placeholder="Progress"
              className="border p-2 rounded w-full mb-4"
              onChange={(e) =>
                handleChange(a.id, "progress", e.target.value)
              }
            />

            {/* SAVE BUTTON */}
            <button
              onClick={() => handleSave(a.id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save & Send to Patient
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorDashboard;