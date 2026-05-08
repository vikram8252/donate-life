import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BiSolidDonateBlood } from "react-icons/bi";

export default function Navbar() {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    setName(localStorage.getItem("name"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          RaktDaan
          <BiSolidDonateBlood />
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/find">
                Find Blood
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/requests">
                Requests
              </Link>
            </li>

            {token && (
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/request">
                  Request Blood
                </Link>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/register">
                  Donate
                </Link>
              </li>
            )}

            {/* admin page */}
            {token && role === "admin" && (
              <li className="nav-item ms-lg-2">
                <Link className="btn btn-dark btn-sm px-3" to="/admin">
                  Admin
                </Link>
              </li>
            )}

            {!token && (
              <>
                <li className="nav-item ms-lg-2">
                  <Link
                    className="btn btn-outline-light btn-sm px-3"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-light btn-sm text-danger px-3"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}

            {token && (
              <li className="nav-item ms-lg-3">
                <CgProfile />
                <span className="text-dark small">
                   <strong>{name} </strong> 
                </span>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-light btn-sm text-danger px-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
