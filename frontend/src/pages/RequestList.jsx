import { useEffect, useState } from "react";
import API from "../services/api";
import { FaMapPin } from "react-icons/fa";
import { MdCall } from "react-icons/md";

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests")
      .then(res => {
        setRequests(res.data);
      })
      .catch(err => {
        console.error("Failed to load requests", err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-danger fw-bold mb-4">
        Blood Requests
      </h3>

      {requests.length === 0 ? (
        <p className="text-muted">No requests found</p>
      ) : (
        <div className="row">
          {requests.map(req => (
            <div className="col-md-4 mb-4" key={req._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="fw-bold">{req.patientName}</h5>

                  <span className="badge bg-danger mb-2">
                    {req.bloodGroup}
                  </span>

                  <p className="text-muted mb-1">
                    <FaMapPin />{req.city}
                  </p>

                  <p className="text-muted small">
                    <MdCall /> {req.phone}
                  </p>

                  <a
                    href={`tel:${req.phone}`}
                    className="btn btn-success w-100"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
