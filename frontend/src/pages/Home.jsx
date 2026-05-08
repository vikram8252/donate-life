import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import UrgentRequestCard from "../components/UrgentRequestCard";
import heroImage from "../assets/hero-bg.png";

export default function Home() {
  const [urgentRequests, setUrgentRequests] = useState([]);

  useEffect(() => {
    API.get("/requests").then((res) => {
      const urgentOnly = res.data.filter((r) => r.urgent === true).slice(0, 3);
      setUrgentRequests(urgentOnly);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.88)",
            padding: "3rem 0",
          }}
        >
          {/* URGENT BLOOD*/}
          {urgentRequests.length > 0 && (
            <div className="container mb-5">
              <div className="text-center mb-3">
                <h4 className="fw-bold text-danger">🚨 Urgent Blood Needed</h4>
                <p className="text-muted small">
                  Immediate help required. Please contact if you can donate.
                </p>
              </div>

              <div className="row justify-content-center">
                {urgentRequests.map((req) => (
                  <div className="col-md-4 mb-3" key={req._id}>
                    <UrgentRequestCard request={req} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HERO SECTION */}
          <div className="container mb-5">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="fw-bold text-danger mb-3">BloodConnect</h1>

                <p className="lead text-muted mb-4">
                  Connecting blood donors with patients in need.
                  <br />
                  One donation can save up to three lives.
                </p>

                <div className="d-flex gap-3">
                  <Link to="/find" className="btn btn-danger btn-lg">
                    Find Blood
                  </Link>

                  <Link
                    to="/register"
                    className="btn btn-outline-danger btn-lg"
                  >
                    Become a Donor
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <div className=" donor-card card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold text-danger">Quick Search</h5>
                    <p className="text-muted">
                      Find blood donors instantly by blood group and location.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className=" donor-card card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold text-danger">Verified Donors</h5>
                    <p className="text-muted">
                      Registered donors with direct contact access.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className=" donor-card card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold text-danger">Consumer</h5>
                    <p className="text-muted">
                      Send requests for urgent blood requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
