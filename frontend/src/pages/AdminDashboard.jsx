import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const donorRes = await API.get("/donors");
    const requestRes = await API.get("/requests");
    setDonors(donorRes.data);
    setRequests(requestRes.data);
  };

  const deleteDonor = async (id) => {
    await API.delete(`/donors/${id}`);
    toast.success("Donor deleted");
    fetchData();
  };

  const deleteRequest = async (id) => {
    await API.delete(`/requests/${id}`);
    toast.success("Request deleted");
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger fw-bold mb-4">Admin Dashboard</h3>

      {/*Stats */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6>Total Donors</h6>
              <h2 className="text-danger">{donors.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6>Total Requests</h6>
              <h2 className="text-danger">{requests.length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Donors */}
      <h5>Donors</h5>
      {donors.map((d) => (
        <div
          key={d._id}
          className="d-flex justify-content-between border p-2 mb-2"
        >
          <span>
            {d.name} ({d.bloodGroup})
          </span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteDonor(d._id)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Requests */}
      <h5 className="mt-4">Blood Requests</h5>
      {requests.map((r) => (
        <div
          key={r._id}
          className="d-flex justify-content-between border p-2 mb-2"
        >
          <span>
            {r.patientName} ({r.bloodGroup})
          </span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteRequest(r._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
