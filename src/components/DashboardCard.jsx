function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        background: "#f1f5f9",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",            // ✅ Full responsive width
        maxWidth: "250px",        // ✅ Prevents too large on desktop
        flex: "1 1 200px",        // ✅ Auto-adjust in flex layout
        boxSizing: "border-box",  // ✅ Prevent overflow
      }}
    >
      <h3 style={{ fontSize: "1.2rem" }}>{title}</h3>
      <p style={{ fontSize: "1rem" }}>{value}</p>
    </div>
  );
}

export default DashboardCard;