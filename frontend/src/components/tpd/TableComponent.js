import React, { useEffect, useState } from "react";
import "../tpd/styles/table.css";
import TextField from "@mui/material/TextField";

const TableComponent = ({ data1, data2 }) => {
  const [singleProductData, setSingleProductData] = useState([]);
  const [multiProductData, setmultiProductData] = useState([]);

  const countData = (data1 = [], processStep) => {
    return data1.filter((value) => {
      if (value.fr_process_steps === processStep) {
        return value;
      }
    }).length;
  };

  const singleProductFilter = (data1 = []) => {
    return data1.filter((eachArrayItem) => {
      if (eachArrayItem.log_action === 1) {
        return eachArrayItem;
      }
    });
  };

  const MultiProductFilter = (data2 = []) => {
    return data2.filter((eachArrayItem) => {
      if (eachArrayItem.log_action) {
        return eachArrayItem;
      }
    });
  };

  //Count number of log action = 2 based on process step & equipment name
  const countLogAction2 = (data2 = [], processStep, equipName) => {
    return data2.filter((eachArrayItem) => {
      if (
        eachArrayItem.log_action === 2 &&
        eachArrayItem.fr_process_steps === processStep &&
        eachArrayItem.name === equipName
      ) {
        return eachArrayItem;
      }
    }).length;
  };

  const getLogAction1Item = (data2 = [], processStep, equipName) => {
    return data2.filter((eachArrayItem) => {
      if (
        eachArrayItem.log_action === 1 &&
        eachArrayItem.fr_process_steps === processStep &&
        eachArrayItem.name === equipName
      ) {
        return eachArrayItem;
      }
    });
  };

  useEffect(() => {
    const filteredSingleProductData = singleProductFilter(data1?.data);
    const filteredMultiProductData = MultiProductFilter(data2?.data);

    const result = Object.values(
      filteredSingleProductData.reduce((r, o) => {
        r[o.name] = r[o.name] && r[o.name].id > o.id ? r[o.name] : o;

        return r;
      }, {})
    );

    setSingleProductData(result);

    //Get the equipment and precess_step with start issue
    let eqpWithIssueArrTemp = [];
    filteredMultiProductData.map((product) => {
      let logAction2 = countLogAction2(
        data2?.data,
        product.fr_process_steps,
        product.name
      );

      //getLogAction1Item is just the function that returns the items instead of count
      let logAction1Items = getLogAction1Item(
        data2?.data,
        product.fr_process_steps,
        product.name
      );

      //Get the difference
      let difference = logAction1Items.length - logAction2;

      //if the difference is more than one, we know there is start without stop, then we get the last N item in logAction1Items
      // note that logAction1Items contains an array of log action items =1 for this process_steps and equipment
      if (difference > 0) {
        eqpWithIssueArrTemp.push(...logAction1Items.slice(-difference));
      }
    });

    //there will be duplicates in above so we remove the duplicates
    setmultiProductData([...new Set(eqpWithIssueArrTemp)]);
  }, []);

  return (
    <>
    {/* <div className="search-row">
      <div className="textField">
      <TextField 
      id="outlined-basic"
      variant="outlined"
      fullWidth
      label="Search equipment"
      />
      </div>
    </div> */}
    <div className="tableComponent">
    <div id="table-scroll">
      <div class="p-4 bg-white-500 u-shadow-lg u-round-xs">
        <div className="table">
          <table class="fixed-header">
            <thead>
              <tr>
                <th>Equipment:</th>
                <th>Current Recipe:</th>
                <th>Equipment running for:</th>
                <th>Stage:</th>
                <th>Average time taken:</th>
              </tr>
            </thead>
            <tbody>
              {singleProductData.map((value, index) => {
                while (countData(data1?.data, value.fr_process_steps) % 2 !== 0)
                  return (
                    <tr key={index}>
                      <td>{value.name}</td>
                      <td>{value.productname}</td>
                      <td>
                        {value.timetostarted.days
                          ? `${value.timetostarted.days} days`
                          : ""}{" "}
                        {value.timetostarted.hours
                          ? `${value.timetostarted.hours} hours`
                          : ""}{" "}
                        {value.timetostarted.minutes
                          ? `${value.timetostarted.minutes} mins`
                          : "0 mins"}{" "}
                      </td>
                      <td>{value.queue}</td>
                      <td>
                        {value.avg.days ? `${value.avg.days} days` : ""}{" "}
                        {value.avg.hours ? `${value.avg.hours} hours` : ""}{" "}
                        {value.avg.minutes ? `${value.avg.minutes} mins` : ""}{" "}
                      </td>
                    </tr>
                  );
              })}

              {/*Return the same table row ui logic */}

              {multiProductData?.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{`${value.name}`}</td>
                    <td>{value.productname}</td>
                    <td>
                      {value.timetostarted.days
                        ? `${value.timetostarted?.days} days`
                        : null}
                      {value.timetostarted.hours
                        ? `${value.timetostarted.hours} hours`
                        : ""}{" "}
                      {value.timetostarted.minutes
                        ? `${value.timetostarted.minutes} mins`
                        : "0 mins"}{" "}
                    </td>
                    <td>{value.queue}</td>
                    <td>
                      {value.avg.days ? `${value.avg?.days} days` : ""}{" "}
                      {value.avg.hours ? `${value.avg.hours} hours` : ""}{" "}
                      {value.avg.minutes ? `${value.avg.minutes} mins` : ""}{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default TableComponent;
