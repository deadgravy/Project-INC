import React, { useRef } from "react";
import Box from "@mui/material/Box";
// import "../pod/styles/box.css";

const Boxe = ({ data }) => {
  const ref = useRef(null);
  const bgColor = [
    "#0CA85D",
    "#9F43CC",
    "#EBA10F",
    "#2B87E3",
    "#fc0303",
    "#31ebf5",
    "#ff895c",
    "#3e2d2d",
  ];

  return (
    <div className="boxes" style={{ flexDirection: "row" }}>
      {data.data.map((adeebisking, count) => (
        <div>
          {count % 2 == 0 ? (
            <Box
              sx={{
                height: 70,
                backgroundColor: bgColor[count],
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
                padding: 1.2,
                fontSize: 12,
                borderRadius: 1,
                marginTop: 5,
                marginLeft: 30,
              }}
            >
              <div className="BoxHeader">{data?.data[count].process_name}</div>
              <div className="BoxSubHeader">
                {data?.data[count].avg.days
                  ? `${data?.data[count].avg.days} days`
                  : ""}{" "}
                {data?.data[count].avg.hours
                  ? `${data?.data[count].avg.hours} hours`
                  : ""}{" "}
                {data?.data[count].avg.minutes
                  ? `${data?.data[count].avg.minutes} minutes`
                  : ""}{" "}
                {data?.data[count].avg.seconds
                  ? `${data?.data[count].avg.seconds} seconds`
                  : ""}{" "}
                {data?.data[count].avg.milliseconds
                  ? `${data?.data[count].avg.milliseconds} milliseconds`
                  : ""}{" "}
              </div>
            </Box>
          ) : (
            <Box
              sx={{
                height: 70,
                backgroundColor: bgColor[count],
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
                padding: 1.2,
                fontSize: 12,
                borderRadius: 1,
                marginTop: 5,
                marginLeft: 30,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="BoxHeader">
                  {data?.data[count].process_name}
                </div>

                <div className="BoxSubHeader">
                  {data?.data[count].avg.days
                    ? `${data?.data[count].avg.days} days`
                    : ""}{" "}
                  {data?.data[count].avg.hours
                    ? `${data?.data[count].avg.hours} hours`
                    : ""}{" "}
                  {data?.data[count].avg.minutes
                    ? `${data?.data[count].avg.minutes} minutes`
                    : ""}{" "}
                  {data?.data[count].avg.seconds
                    ? `${data?.data[count].avg.seconds} seconds`
                    : ""}{" "}
                  {data?.data[count].avg.milliseconds
                    ? `${data?.data[count].avg.milliseconds} milliseconds`
                    : ""}{" "}
                </div>
              </div>
            </Box>
          )}
        </div>
      ))}
    </div>
  );
};

export default Boxe;
