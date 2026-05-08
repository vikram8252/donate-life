import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        toast.success("Admin account created 🛡️");
      } else {
        toast.success("Signup successful 🎉");
      }

      localStorage.setItem("name", res.data.name);

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center text-danger fw-bold mb-4">Signup</h3>

          <form onSubmit={submit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Admin Code (optional)"
                value={form.adminCode}
                onChange={(e) =>
                  setForm({ ...form, adminCode: e.target.value })
                }
              />
              <small className="text-muted">
                Enter admin code only if you are an administrator
              </small>
            </div>

            <button className="btn btn-danger w-100">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
