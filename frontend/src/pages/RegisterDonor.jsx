import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterDonor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    city: "",
    bloodGroup: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/donors", form);
    toast.success("Donor registered successfully");
    navigate("/find");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center text-danger fw-bold mb-4">
            Become a Donor
          </h3>

          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
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

            <button className="btn btn-danger w-100">Register as Donor</button>
          </form>
        </div>
      </div>
    </div>
  );
}
