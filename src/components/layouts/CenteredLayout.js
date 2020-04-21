import React from "react"

const CenteredLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 md:px-12 lg:px-48 max-w-screen-lg">
      {children}
    </div>
  )
}

export default CenteredLayout
