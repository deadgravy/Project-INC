import React, { useEffect, useState, useRef } from "react";
import "../tpd/styles/table.css";
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import "./styles/modal.css";

export default function TableComponent({ data1, data2 }) {
  const [singleProductData, setSingleProductData] = useState([]);
  const [multiProductData, setmultiProductData] = useState([]);
  const [multiModalData, setmultiModalData] = useState([]);
  const [singleModal, setSingleModal] = useState(false);
  const [multiModal, setMultiModal] = useState(false);
  const tableRef = useRef(null);

  const toggleSingleModal = () => {
    setSingleModal(!singleModal);
  };

  const toggleMultiModal = () => {
    setMultiModal(!multiModal);
  };

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

  //Scroll to function
  const onEquipSelect = (id) => {
    const containerChartEle = tableRef.current;
    const equipEle = document.getElementById(id);
    containerChartEle.scrollTo({
      top: equipEle.offsetTop - 70,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const filteredSingleProductData = singleProductFilter(data1?.data);
    const filteredMultiProductData = MultiProductFilter(data2?.data);
    const filteredMultiModalData = MultiProductFilter(data2?.data);

    const result = Object.values(
      filteredSingleProductData.reduce((r, o) => {
        r[o.name] = r[o.name] && r[o.name].id > o.id ? r[o.name] : o;

        return r;
      }, {})
    );

    const result2 = Object.values(
      filteredMultiModalData.reduce((r, o) => {
        r[o.name] = r[o.name] && r[o.name].id > o.id ? r[o.name] : o;

        return r;
      }, {})
    );

    setSingleProductData(result);
    setmultiModalData(result2);

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
    <div>
      <div className="row">
        <div className="singleProduct">
          <button onClick={toggleSingleModal} className='btn-modal'>
            Single Product
          </button>
        </div>
        <div className="multiProduct">
          <button onClick={toggleMultiModal} className='btn-modal'>
            Multi Product
          </button>
        </div>
      </div>
      {singleModal && (
        <div className=''>
          <div onClick={toggleSingleModal} className='overlay'>
          <div className='modal-content'>
            <h4>Equipments currently running:</h4>
              {singleProductData.map((equip) => {
                while (countData(data1?.data, equip.fr_process_steps) % 2 !== 0)
                return(
                    <button
                      key={equip.equipid}
                      onClick={() => onEquipSelect(equip.equipid)}
                    >
                      {equip.name}
                    </button>
            )})}
            <button className='close-modal' onClick={toggleSingleModal}>
              <CloseIcon />
            </button>
          </div>
        </div>
        </div>
      )}
      {multiModal && (
        <div className=''>
          <div onClick={toggleMultiModal} className='overlay'>
          <div className='modal-content'>
            <h4>Equipments currently running:</h4>
              {multiModalData.map((equip) => (
                    <button
                      key={equip.equipid}
                      onClick={() => onEquipSelect(equip.equipid)}
                    >
                      {equip.name}
                    </button>
              ))}
            <button className='close-modal' onClick={toggleMultiModal}>
              <CloseIcon />
            </button>
          </div>
        </div>
        </div>
        
      )}
    <div ref={tableRef} className="tableComponent">
    <div id="table-scroll">
      <div className="p-4 bg-white-500 u-round-xs">
        <div className="table">
          <table className="fixed-header">
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
                    <tr key={index} id={value.equipid}>
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
                  <tr key={index} id={value.equipid}>
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
    </div>
    </>
  );
};
