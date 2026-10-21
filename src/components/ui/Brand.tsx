import { navigate } from "../../utils/navigation"

export default function Brand() {
  return (
    <button
      className="brand"
      onClick={() => navigate("home")}
      aria-label="HK Enterprise home"
    >
      <img
        src="/hk-emblem.png"
        alt="HK Enterprise Logo"
        className="brand-logo-img"
        style={{
          width: "36px",
          height: "36px",
          objectFit: "contain",
          filter: "drop-shadow(0 2px 8px rgba(201,164,76,0.35))",
          transition: "transform 0.3s ease",
        }}
      />
      <span className="brand-copy">
        <strong>ENTERPRISE</strong>
        <small>Precision hardware</small>
      </span>
    </button>
  )
}
