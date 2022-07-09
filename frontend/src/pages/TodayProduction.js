import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import ProductChart from "../components/tpd/ProductChart";
// import "../styles/todayProduction.css"
const TodayProduction = () => {
  const [completedProductsData, setCompletedProductsData] = useState(null);
  const [toBeCompletedProductsData, setToBeCompletedProductsData] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  // useEffect
  useEffect(() => {

    setIsloading(true);

    Promise.all([
      fetch("http://localhost:4000/api/getCompletedProducts").then((res) => res.json()),
      fetch("http://localhost:4000/api/getProductsToComplete").then((res) => res.json()),
    ])
      .then(([result1, result2]) => {
        setCompletedProductsData({
          data: result1.data,
          value: [{ value: 50 }, { value: 50 }],
        });
        setToBeCompletedProductsData({
          data: result2.data
        });
        setIsloading(false);
      })
      .catch((error) => console.log("error", error));

   
  }, []);

  return (
    <div className="App">
      {!isLoading ? (
        
        <div className="Row1">
          <ProductChart data1={completedProductsData} data2={toBeCompletedProductsData} />
          </div>
      ) : (
        <div> Loading... </div> // TODO: Loading loading spinner or loading component
      )}
    </div>
  );
};

export default TodayProduction;