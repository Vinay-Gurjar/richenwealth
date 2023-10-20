import React, {useContext, useState, useEffect} from "react";
import './minimumCallConnected.css'
import axios from "axios";
import {ApiContext} from "../ApiContext";
import {isValuePresent} from "../../utils";

const MinimumCallConnected = () => {
    const {minimumCallsDate,minimumCallsTime} = useContext(ApiContext)
    const [header, setHeader] = useState([])
    const [tableData, setTableData] = useState([])

    const getCalls = () => {
        return axios.get('/api/reports/agents/minimum_calls_connected',{
            params: {
                date: minimumCallsDate,
                rt_id: minimumCallsTime,
            },
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
            }
        })
            .then((response) => {
                setHeader(response.data.headers)
                setTableData(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    useEffect(() => {
        if (isValuePresent(minimumCallsDate) && isValuePresent(minimumCallsTime)) {
            getCalls()
        }
    }, [minimumCallsDate]);

    useEffect(() => {
        if (isValuePresent(minimumCallsDate) && isValuePresent(minimumCallsTime)) {
            getCalls()
        }
    }, [minimumCallsTime]);

    return (
        <>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        {header &&
                            header.map((subHeader, index) => (
                                <th className='agent-min-call-header' key={index}>
                                    {subHeader}
                                </th>
                            ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableData && tableData.map((tableItem) => (
                    <tr>
                        {tableItem.map((item) => (
                            <td className='agent-min-call-value'>
                                {item}
                            </td>
                        ))}
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MinimumCallConnected;