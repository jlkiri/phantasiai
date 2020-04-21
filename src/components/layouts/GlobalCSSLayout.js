import "../../styles/global.css"
import "./themes/prism-nord.css"
import React from "react"

export const GlobalCSSLayout = ({ children }) => (
  <div className="transition-color duration-500 relative text-primary min-h-screen">
    {children}
  </div>
)
