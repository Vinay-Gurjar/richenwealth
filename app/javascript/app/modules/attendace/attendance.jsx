import React, {useState, useEffect, useContext} from 'react'
import './attendance.css'
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";
import axios from "axios";
import {ApiContext} from "../ApiContext";
import {findValueFromArray, getFullDate} from "../../utils";
import Backdrop from "../back-drop/backDrop";
import Tooltip from '@mui/material/Tooltip';

const Attendance = ({}) => {
    const {userDetails,attendanceYear, attendanceMonth, attendanceDays,config} = useContext(ApiContext)
    const [selectedMonth, setSelectedMonth] =useState(new Date());
    const [selectedDate,setSelectedDate] =useState([])
    const [ccEmployees, setCcEmployees] =useState([])
    const [loader, setLoader] =useState(false)
    const today = new Date(); // Create a new Date object for the current date
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const [tableHeaders, setTableHeaders] = useState([])
    const fullDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;


const [count,setCount] =useState(0)
    const getCcEmployee = () => {
        setLoader(true)
        const fullDate = getFullDate(attendanceYear,attendanceDays[0])
        return axios.get('api/call_center/employees',{
            params: {
                cc_id: userDetails?.cc_id,
                start_date: fullDate
            },
            headers: config.headers})
            .then((response) => {
                setCcEmployees(response.data.data)
                setTableHeaders(response.data.headers)
                setTimeout(() => {
                    setLoader(false)
                }, 1000);

                return response.data;
            })
            .catch((error) => {
                setLoader(false)
                console.error('Error:', error);
                throw error;
            });
    };


    const updateAttendance = (userId, day, attendanceType) => {
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('day', day);
        formData.append('a_type', attendanceType);
        return axios.post('api/call_center/employee/update_attendance', formData,config)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    };

    useEffect(() => {
        setLoader(true)
        getCcEmployee()
    },[attendanceMonth || attendanceYear])

       const attendanceType = [
        { id: 1, value: 'P' },{ id: 2, value: 'WO' },{ id: 3, value: '1/2P' },
        { id: 4, value: 'A' },{ id: 5, value: 'OGT' },{ id: 6, value: 'TD' }
    ]


    const isAgentActive = (status) => {
        let agent = true
        if (status === 'inactive') {
            agent = false
        }
        return agent
    }
    const changeAttendance = (userId, day) => (event, value) => {
        const fullDate = getFullDate(attendanceYear,day)
        updateAttendance(userId, fullDate, value.value)
        ccEmployees.map((agent) => {
            if (agent.id === userId) {
                agent.attendance[0][day.replace(/\s/g, '')] = value.value
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

    function transformData(data) {
        return data.reduce((acc, obj) => {
            for (const key in obj) {
                if (obj[key] && key !== 'updated_by') {
                    acc[key] = obj[key];
                }
            }
            return acc;
        }, {});
    }

    function filterDataByPattern(data, pattern) {
        return data.filter((entry) => {
            const keys = Object.keys(entry);
            return keys.some((key) => key.includes(pattern));
        });
    }

    const getUpdatedBy = (data, pattern) => {
        let msg = ''
      const attendanceArray =  filterDataByPattern(data, pattern)
      if (attendanceArray.map(item => item.updated_by)[0]) {
          msg = `Attendance Updated By: ${attendanceArray.map(item => item.updated_by)[0]}`
      }
      return msg
    }

    const compareDates = (smallDate, largeDate) => {
        return smallDate > largeDate
    }




    return (
        <div className='attendance-component'>
        {loader ?    <Backdrop toggle={loader} /> :
            <table className="table">
                <thead style={{ overflowX: 'hidden' }}>
                <tr>
                    {tableHeaders &&
                        tableHeaders.map((subHeader, index) => (
                            <th style={{border: '1px solid black'}} className='attendance-table-header' key={index}>
                                {subHeader}
                            </th>
                        ))
                    }

                </tr>
                </thead>
                <tbody style={{ overflowX: 'hidden' }}>
                    {ccEmployees && ccEmployees.map((agents, index) => (
                        <tr className='test' key={index}>
                            {agents && Object.values(agents).map((agent,index) => (
                                index > 0 && index < 9 ?
                                <td key={index} className='agent-details' style={{color: isAgentActive(Object.values(agents)[7]) ? '' : 'red' }}>
                                    {agent}
                                </td>
                            : ''
                            ))}
                            {tableHeaders.slice(8, tableHeaders.length) && tableHeaders.slice(8, tableHeaders.length).map((day,index) => (
                                <td className='agent-details' key={`${day.replace(/\s/g, '')}${agents.email}`}>
                                    <div  key={`${day.replace(/\s/g, '')} ${index} ${agents.email}`}>
                                        <Tooltip title={getUpdatedBy(agents.attendance[0], day.replace(/\s/g, ''))}>
                                        <Autocomplete
                                            disabled={compareDates(agents.doj , getFullDate(attendanceYear, day)) ||
                                                      compareDates(fullDate , getFullDate(attendanceYear, day)) && (!userDetails?.roles.includes('call_center_manager') && !userDetails?.roles.includes('admin')) }
                                            key={`${day.replace(/\s/g, '')}`}
                                            className={`attendance-dropdown attendance-dropdown-${transformData(agents.attendance[0])[day.replace(/\s/g, '')]}`}
                                            options={attendanceType}
                                            value={attendanceType.find(value => value.value === transformData(agents.attendance[0])[day.replace(/\s/g, '')])  || isAttendanceSelected(agents.id, day)}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            getOptionLabel={(option) => option.value || ""}
                                            onChange={changeAttendance(agents.id, day)}
                                            renderInput={(params) => <TextField
                                                                                 InputProps={{
                                                                                     ...params.InputProps,
                                                                                     readOnly: true, // Prevents user input
                                                                                 }} {   ...params}
                                            />}
                                        />
                                        </Tooltip>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    )
}

export default Attendance