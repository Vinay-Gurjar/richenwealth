import React, {useState, useEffect, useContext} from 'react'
import './attendance.css'
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";
import axios from "axios";
import {ApiContext} from "../ApiContext";

const Attendance = ({}) => {
    const {setIsLogin,setUserDetails,userDetails} = useContext(ApiContext)
    const [selectedMonth, setSelectedMonth] =useState(new Date());
    const [selectedDate,setSelectedDate] =useState([])
    const config = {
        headers: {
            'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
        }
    }

    const getCcEmployee = () => {
        return axios.get('/call_center/employees',{
            params: {
                cc_id: userDetails?.cc_id
            },
            headers: config.headers})
            .then((response) => {
                console.log(response.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    };

    useEffect(() => {
        getCcEmployee()
    },[])

    const getDaysInMonth = () => {
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        const days = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    };


    const tableHeaders = ["DOJ", "Designation", "Candidate Name", "Gender", "Email", "Team Leader", "Status", "Inactive Date"];
    const attendanceType = [
        { id: 1, value: 'P' },{ id: 2, value: 'WO' },{ id: 3, value: '1/2P' },
        { id: 4, value: 'A' },{ id: 5, value: 'OGT' },{ id: 6, value: 'TD' }
    ]

    const monthDays = [...getDaysInMonth().map(day => {
        const dayOfMonth = day.getDate();
        const monthName = day.toLocaleString('default', { month: 'short' });
        return `${monthName} ${dayOfMonth}`;
    }),]

    const agentData = [

    ]


    const [ccEmployees, setCcEmployees] =useState(agentData)

    const isAgentActive = (status) => {
        let agent = true
        if (status === 'Inactive') {
            agent = false
        }
        return agent
    }
    const changeAttendance = (agentId, day) => (event, value) => {
        ccEmployees.map((agent) => {
            if (agent.id === agentId) {
                agent.attendance[0][day] = value.value
            }
        })
    }

    const attendanceColor = (value) => {
        let color = '#000000'
        if (value === 'P') {
            color = '#34a853'
        } else if (value === 'A') {
            color = '#ff0000'
        } else if (value === '/2P') {
            color ='#bf9000'
        }
        return color
    }

    const isAttendanceSelected = (agentId, day) => {
        let attendance = null
            attendance = selectedDate.filter((item) => item.id === agentId)
        if (attendance !== null) {
            attendance = attendance[day]
        }
        return attendance
    }

    return (
        <>
            {/*<select*/}
            {/*    value={selectedMonth.toISOString().substring(0, 7)}*/}
            {/*    onChange={(e) => setSelectedMonth(new Date(e.target.value))}*/}
            {/*>*/}
            {/*    <option value="2023-10">October 2023</option>*/}
            {/*    <option value="2023-11">Nov 2023</option>*/}
            {/*</select>*/}


            <table className="table">
                <thead>
                <tr>
                    {tableHeaders &&
                        tableHeaders.map((subHeader, index) => (
                            <th style={{border: '1px solid black'}} className='attendance-table-header' key={index}>
                                {subHeader}
                            </th>
                        ))
                    }
                    {monthDays &&
                        monthDays.map((subHeader, index) => (
                            <th style={{border: '1px solid black'}} className='attendance-table-header' key={index}>
                                {subHeader}
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>

                    {ccEmployees && ccEmployees.map((agents, index) => (
                        <tr key={index}>

                            {agents && Object.values(agents).map((agent,index) => (
                                index > 0 && index < 9 ?
                                <td key={index} className='agent-details' style={{color: isAgentActive(Object.values(agents)[7]) ? '' : 'red' }}>
                                    {agent}
                                </td>
                            : ''
                            ))}
                            {monthDays && monthDays.map((day,index) => (
                                <td className='agent-details' key={`${day.replace(/\s/g, '')}${agents.email}`}>
                                    <div  key={`${day.replace(/\s/g, '')}${agents.email}`}>
                                        <Autocomplete
                                            key={`${day.replace(/\s/g, '')}${agents.email}`}
                                            className='attendance-dropdown'
                                            style={{color: attendanceColor(agents.attendance[0][day.replace(/\s/g, '')])}}
                                            id={`combo-box-demo${day.replace(/\s/g, '')}${agents.email}`}
                                            options={attendanceType}
                                            value={attendanceType.find(value => value.value === agents.attendance[0][day.replace(/\s/g, '')]) || isAttendanceSelected(agents.id, day)}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            getOptionLabel={(option) => option.value || ""}
                                            onChange={changeAttendance(agents.id, day.replace(/\s/g, ''))}
                                            blurOnSelect={true}
                                            renderInput={(params) => <TextField {...params} label={''}
                                            />}
                                        />
                                    </div>
                                </td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Attendance