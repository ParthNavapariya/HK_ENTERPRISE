import React from "react"
import Icon from "./Icon"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  secondary?: boolean
  type?: "button" | "submit"
}

export default function Button({
  children,
  onClick,
  secondary = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn ${secondary ? "btn-secondary" : ""}`}
      onClick={onClick}
    >
      <span>{children}</span>
      <Icon name="arrow" />
    </button>
  )
}
