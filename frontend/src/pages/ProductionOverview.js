import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import ChartComponent from "../components/pod/ChartComponent";
import Boxe from "../components/pod/boxe";

const ProductionOverview = () => {
  const [prodOverviewData, setProdOverviewData] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  // useEffect
  useEffect(() => {
    setIsloading(true);
    fetch("http://localhost:4000/api/data/data2")
      .then((res) => res.json())
      .then((data) => {
        // Below should be just setProdOverviewData(data), where data is your full backend data.
        console.log(data);
        setProdOverviewData({
          data: data.data,
          value: [{ value: 25 }, { value: 35 }, { value: 45 }, { value: 15 }],
        });
        setIsloading(false);
      });

   
  }, []);

  return (
    <div className="App">
      {!isLoading ? (
        <div className="Row1">
          {/* <FetchData data={data} /> */}
          <ChartComponent data={prodOverviewData} />
          <Boxe data={prodOverviewData} />
        </div>
      ) : (
        <div> Loading... </div> // TODO: Loading loading spinner or loading component
      )}
    </div>
  );
};

export default ProductionOverview;