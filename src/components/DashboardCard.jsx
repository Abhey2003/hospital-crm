function DashboardCard({ title, value }) {
  return (
    <div style={{
      background: "#f1f5f9",
      padding: "20px",
      borderRadius: "10px",
      width: "150px"
    }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default DashboardCard;