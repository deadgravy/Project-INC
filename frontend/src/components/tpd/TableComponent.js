import React, { useEffect, useState } from 'react'
// import "../tpd/styles/table.css";

const TableComponent = ({ data }) => {

    const [filteredData, setFilteredData] = useState([])

    const countData = (data = [], processStep) => {
        return data.filter((value) => {
            if (value.fr_process_steps === processStep) {
                return value
            }
        }).length
    }

    const dataFilter = (data = []) => {
        return data.filter((eachArrayItem) => {
            // for 
            // if (countData(data?.data, ) % 2 == 0){

            if (eachArrayItem.log_action) {
                return eachArrayItem;
            }

            // else {
            //     return ""
            // }
        })
    }

    useEffect(() => {
        console.log(countData(data?.data, 241))
        const filteredData1 = dataFilter(data?.data)
        setFilteredData(filteredData1)
    }, [])

    return (
        <div className='table'>
            <div class="p-4 bg-white-500 u-shadow-lg u-round-xs">
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
                        {filteredData.map((value) => {
                            // for(var i = 0; i < data?.data.length; i++)
                            // var counter = data?.data[i].fr_process_steps.length;
                            // if(data?.data[i].fr_process_steps)
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
                                            : ""}{" "}
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
    )
}

export default TableComponent;