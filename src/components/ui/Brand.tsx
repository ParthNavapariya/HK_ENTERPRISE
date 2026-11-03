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
          width: "48px",
          height: "48px",
          objectFit: "contain",
          filter: "drop-shadow(0 2px 10px rgba(201,164,76,0.4))",
          transition: "transform 0.3s ease",
        }}
      />
      <span className="brand-copy">
        <strong>ENTERPRISE</strong>
      </span>
    </button>
  )
}
