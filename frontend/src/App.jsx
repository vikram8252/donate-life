import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegisterDonor from "./pages/RegisterDonor";
import FindBlood from "./pages/FindBlood";
import RequestBlood from "./pages/RequestBlood";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import AuthRedirect from "./components/AuthRedirect";
import Footer from "./components/Footer";
import RequestList from "./pages/RequestList";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterDonor />} />
            <Route path="/find" element={<FindBlood />} />
            <Route path="/request" element={<RequestBlood />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/requests" element={<RequestList />} />
            <Route
              path="/login"
              element={
                <AuthRedirect>
                  <Login />
                </AuthRedirect>
              }
            />

            <Route
              path="/signup"
              element={
                <AuthRedirect>
                  <Signup />
                </AuthRedirect>
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
