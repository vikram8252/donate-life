import { useEffect, useState } from "react";
import API from "../services/api";
import DonorCard from "../components/DonorCard";

export default function FindBlood() {
  const [donors, setDonors] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    API.get("/donors").then((res) => setDonors(res.data));
  }, []);

  const filteredDonors = donors.filter((d) =>
    filter ? d.bloodGroup === filter : true
  );

  return (
    <div className="container mt-4">
      <h3 className="text-danger fw-bold mb-3">Find Blood</h3>

      {/*Filter*/}
      <select
        className="form-select mb-4"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All Blood Groups</option>
        <option>O+</option>
        <option>A+</option>
        <option>B+</option>
        <option>AB+</option>
        <option>O-</option>
        <option>A-</option>
        <option>B-</option>
        <option>AB-</option>
      </select>

      <div className="row">
        {filteredDonors.length === 0 && (
          <p className="text-muted">No donors found</p>
        )}

        {filteredDonors.map((d) => (
          <div className="col-md-4 mb-3" key={d._id}>
            <DonorCard donor={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
