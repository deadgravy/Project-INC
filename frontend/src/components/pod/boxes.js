import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import "../styles/styles.css";
import ChartComponent from "../components/pod/ChartComponent";

const boxes = ({ data }) => {
  const ref = useRef(null);

  if (data) {
   
  }

  return (
    <div className="container">
      <div className="graph" ref={ref} />
    </div>
  );
};


export default React.memo(boxes);