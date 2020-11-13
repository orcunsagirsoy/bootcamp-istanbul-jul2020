import React from "react"
import { MDBTypography, MDBIcon } from "mdbreact"

const HomePageHeader = () => {
  return (
    <>
      <MDBTypography tag="h1" className="text-center">
        <MDBIcon icon="map-marked" className="cyan-text pr-3" size="1x" />
        <br />
        <strong className="cyan-text">
          <i>Your Travel Wishes...</i>{" "}
        </strong>
      </MDBTypography>
    </>
  )
}

export default HomePageHeader
