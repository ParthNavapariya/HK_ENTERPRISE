import React from "react"

export default function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <div className={`eyebrow ${light ? "light" : ""}`}>
      <i />
      <span>{children}</span>
    </div>
  )
}
