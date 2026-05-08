import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function RequestBlood() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    city: "",
    phone: "",
    urgent: false,
  });
  const submit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/requests", form);
    toast.success("Blood request submitted successfully");
    navigate("/requests")

    setForm({
      patientName: "",
      bloodGroup: "",
      city: "",
      phone: "",
      urgent: false,
    });

  } catch (err) {
    if (err.response?.status === 429) {
      toast.error("You can only request blood 3 times in a day");
    } else {
      toast.error("Something went wrong");
    }
  }
};

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center text-danger fw-bold mb-4">
            Request Blood
          </h3>

          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Patient Name"
                value={form.patientName}
                onChange={(e) =>
                  setForm({ ...form, patientName: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                value={form.bloodGroup}
                onChange={(e) =>
                  setForm({ ...form, bloodGroup: e.target.value })
                }
                required
              >
                <option value="">Select Blood Group</option>
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Contact Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={form.urgent}
                onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
              />
              <label className="form-check-label fw-semibold text-danger">
                Mark as urgent
              </label>
            </div>

            <button className="btn btn-danger w-100">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}
