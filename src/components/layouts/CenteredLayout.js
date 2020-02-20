import React from "react"

const CenteredLayout = ({ children }) => {
  return (
    <div className="container text-primary bg-secondary mx-auto pt-4 px-4 md:px-12 lg:px-56">
      {children}
    </div>
  )
}

export default CenteredLayout
