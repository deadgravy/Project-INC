import { valueToPercent } from '@mui/base';
import React, { useEffect, useState } from 'react'
import "../tpd/styles/table.css";

const TableComponent = ({ data1, data2 }) => {

    const [singleProductData, setSingleProductData] = useState([]);
    const [MultiProductData, setMultiProductData] = useState([]);

    const countData = (data1 = [], processStep) => {
        return data1.filter((value) => {
            if (value.fr_process_steps === processStep) {
                return value
            }
        }).length
    }

    const singleProductFilter = (data1 = []) => {
        return data1.filter((eachArrayItem) => {
            if (eachArrayItem.log_action === 1) {
                return eachArrayItem;
            }
        })
    }

    const MultiProductFilter = (data2 = []) => {
        return data2.filter((eachArrayItem) => {
            if (eachArrayItem.log_action) {
                return eachArrayItem;
            }
        })
    }

    const countLogAction1 = (data2 = [], processStep) => {
        return data2.filter((eachArrayItem2) => {
            var count;
            while (eachArrayItem2.fr_process_steps === processStep) {      
                if (eachArrayItem2.log_action === 1) {
                    count += 1;
                }
            }
        })
    }

    useEffect(() => {
        const filteredSingleProductData = singleProductFilter(data1?.data);
        const filteredMultiProductData = MultiProductFilter(data2?.data);

        const result = Object.values(
            filteredSingleProductData.reduce((r, o) => {
                r[o.name] = r[o.name] && r[o.name].id > o.id ? r[o.name] : o;

                return r;
            }, {})
        );

        // console.log(countLogAction1(data2?.data, data2?.fr_process_steps));

        setSingleProductData(result);
        setMultiProductData(filteredMultiProductData);

    }, [])

    return (
        <div className='table'>
            <div class="p-4 bg-white-500 u-shadow-lg u-round-xs">
                <div className='table'>
                <table class="table">
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
                        {singleProductData.map((value) => {

                            while(countData(data1?.data, value.fr_process_steps) % 2 !== 0)

                            return (
                                
                                <tr>
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
                                        {value.avg.days
                                            ? `${value.avg.days} days`
                                            : ""}{" "}
                                        {value.avg.hours
                                            ? `${value.avg.hours} hours`
                                            : ""}{" "}
                                        {value.avg.minutes
                                            ? `${value.avg.minutes} mins`
                                            : ""}{" "}
                                    </td>
                                </tr>
                            )
                        })}
                        {MultiProductData.map((value) => {

                            return (
                                
                                <tr>
                                    <td>{value.name + value.log_action }</td>
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
                                        {value.avg.days
                                            ? `${value.avg.days} days`
                                            : ""}{" "}
                                        {value.avg.hours
                                            ? `${value.avg.hours} hours`
                                            : ""}{" "}
                                        {value.avg.minutes
                                            ? `${value.avg.minutes} mins`
                                            : ""}{" "}
                                    </td>
                                </tr>
                            )
                            })}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}

export default TableComponent;