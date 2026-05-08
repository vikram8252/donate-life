export default function UrgentRequestCard({ request }) {
  return (
    <div className="card urgent-card h-100">
      <div className="card-body text-center p-4">
        <span className="urgent-badge">URGENT</span>

        <h5 className="fw-bold mt-3">{request.patientName}</h5>

        <span className="badge bg-danger mb-2 px-3 py-2">
          {request.bloodGroup}
        </span>

        <p className="text-muted mb-2">📍 {request.city}</p>

        <p className="text-muted small mb-3">📞 {request.phone}</p>

        <a href={`tel:${request.phone}`} className="btn btn-danger w-100">
          Call Immediately
        </a>
      </div>
    </div>
  );
}
