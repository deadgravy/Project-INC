import React, { useRef } from "react";
import Box from "@mui/material/Box";


const Boxe = ({data}) => {
  const ref = useRef(null);
  return(
      <div>
               {/* Start of boxes */}
        <div className="Boxes">
          <div className="BoxRow1">
            <Box
              sx={{
                width: 135,
                height: 70,
                backgroundColor: "#0CA85D",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
                padding: 1.2,
                fontSize: 12,
                borderRadius: 1,
                marginTop: 15,
                marginLeft: 40,
              }}
            >
               <div className="BoxHeader">{data?.data[0].process_name}</div>
              {/* <div className="BoxSubHeader">{data.data[0].avg}</div> */}
              {/* {data && <div className="BoxHeader">{data.data[0].process_name}</div>} */}
            
            </Box>
            <Box
              sx={{
                width: 135,
                height: 70,
                backgroundColor: "#9F43CC",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
                padding: 1.2,
                fontSize: 12,
                borderRadius: 1,
                marginLeft: 3,
                marginTop: 15,
              }}
            >
              <div className="BoxHeader">Mixing (2nd Step)</div>
              <div className="BoxSubHeader">35 minutes</div>
            </Box>
          </div>

          <div className="BoxRow2">
            <Box
              sx={{
                width: 135,
                height: 70,
                backgroundColor: "#EBA10F",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
                padding: 1.2,
                fontSize: 12,
                borderRadius: 1,
                marginTop: 3,
                marginLeft: 40,
              }}
            >
              <div className="BoxHeader">Baking (3rd Step)</div>
              <div className="BoxSubHeader">15 minutes</div>
            </Box>
            <Box
              sx={{
                width: 135,
                height: 70,
                backgroundColor: "#2B87E3",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
                padding: 1.2,
                fontSize: 12,
                borderRadius: 1,
                marginLeft: 3,
                marginTop: 3,
              }}
            >
              <div className="BoxHeader">Packing (4th Step)</div>
              <div className="BoxSubHeader">45 minutes</div>
            </Box>
          </div>
        </div>
        {/* End of boxes */}
      </div>
  )

}

export default Boxe;