import "../../styles/global.css"
import "./themes/prism-nord.css"
import React from "react"

export const GlobalCSSLayout = ({ children }) => (
  <div className="relative text-primary min-h-screen">{children}</div>
)
