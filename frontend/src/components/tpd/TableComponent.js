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
            if (eachArrayItem.log_action == 1) {
                return eachArrayItem;
            }
        })
    }

    useEffect(() => {
        const filteredData1 = dataFilter(data?.data)
        setFilteredData(filteredData1)
    }, [])

    return (
        <div className='table'>
            <div className="p-4 bg-white-500 u-shadow-lg u-round-xs">
                <div className='table'>
                <table className="table">
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
                            while(countData(data?.data, value.fr_process_steps) % 2 !== 0 && Math.max(value.id))
                            return (
                                
                                <tr>
                                    <td>{value.name} + {value.id}</td>
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
        </div>
    )
}

export default TableComponent;