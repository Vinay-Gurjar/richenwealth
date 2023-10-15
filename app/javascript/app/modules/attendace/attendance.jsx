import React, {useState,useEffect} from 'react'
import './attendance.css'
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";

const Attendance = ({}) => {
    const [selectedMonth, setSelectedMonth] =useState(new Date());
    const [selectedDate,setSelectedDate] =useState([])

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
        {id:1, doj: '10-Sep',designation: 'Agent',name: 'Jyotik',gender: 'Female',email: 'Jyotikapillai13@gmail.com',team_leader: 'Mansi Kushwaha',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct1: 'P',Oct2: 'P',Oct3: 'P',Oct4: 'P',Oct5: 'P',Oct6: 'WO',Oct7: 'P',Oct8: 'A',Oct9: '1/2P',Oct10: 'A',Oct11: 'P',Oct12: 'WO',Oct13: '1/2P',Oct14: 'A',Oct15: 'OGT',Oct16: 'TD',Oct17: 'A',}
            ] },
        {
            id:2, doj: '11-Sep',designation: 'Agent',name: 'renuch',gender: 'Female',email: 'renuchaurasia62@gmail.com',team_leader: 'Mansi Kushwaha',status: 'Active',inactive_date: '11-Sep',
            attendance: [
                {Oct1: 'P',Oct2: 'P',Oct3: 'P',Oct4: 'P',Oct5: 'P',Oct6: 'WO',Oct7: 'P',Oct8: 'A',Oct9: '1/2P',Oct10: 'A',Oct11: 'P',Oct12: 'WO',Oct13: '1/2P',Oct14: 'A',Oct15: 'OGT',Oct16: 'TD',Oct17: 'A',}
            ]
        },
        {
            id:3, doj: '10-Sep',designation: 'Agent',name: 'patela',gender: 'Female',email: 'patelanjali05061997@gmail.com',team_leader: 'Mansi Kushwaha',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct2: 'P',Oct3: 'P',Oct4: 'P',Oct5: 'P',Oct6: 'P',Oct7: 'WO',Oct8: 'P',Oct9: 'A',Oct10: '1/2P',Oct11: 'A',Oct12: 'P',Oct13: 'WO',Oct14: '1/2P',Oct15: 'A',Oct16: 'OGT',Oct17: 'TD',Oct18: 'A',}
            ]
        },
        {id:4, doj: '11-Sep',designation: 'Agent',name: 'shivan',gender: 'Female',email: 'shivangee6170@gmail.com',team_leader: 'Astuti Singh',status: 'Inactive',inactive_date: '11-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:5, doj: '10-Sep',designation: 'Agent',name: 'singhh',gender: 'Female',email: 'singhhsonam007@gmail.com',team_leader: 'Mansi Kushwaha',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct2: 'P',Oct3: 'P',Oct4: 'P',Oct5: 'P',Oct6: 'P',Oct7: 'WO',Oct8: 'P',Oct9: 'A',Oct10: '1/2P',Oct11: 'A',Oct12: 'P',Oct13: 'WO',Oct14: '1/2P',Oct15: 'A',Oct16: 'OGT',Oct17: 'TD',Oct18: 'A',}
            ]
        },
        {id:6, doj: '10-Sep',designation: 'Agent',name: 'ds1110',gender: 'Female',email: 'ds11101319@gmail.com',team_leader: 'Mansi Kushwaha',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:7, doj: '10-Sep',designation: 'Agent',name: 'nandin',gender: 'Female',email: 'nandini0932@gmail.com',team_leader: 'Mansi Kushwaha',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:8, doj: '10-Sep',designation: 'Agent',name: 'sugand',gender: 'Female',email: 'sugandhita0542@gmail.com',team_leader: 'Mansi Kusdfsdfsdfdsshwaha',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:9, doj: '13-Sep',designation: 'Agent',name: 'yneha4',gender: 'Female',email: 'yneha4229@gamil.com',team_leader: 'Astuti Singh',status: 'Active',inactive_date: '13-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:10, doj: '13-Sep',designation: 'Agent',name: 'amarsi',gender: 'Female',email: 'amarsingh27398@gmail.com',team_leader: 'Mansi Kushwaha',status: 'Inactive',inactive_date: '13-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:11, doj: '18-Sep',designation: 'Agent',name: '2020pa',gender: 'Female',email: '2020payal05@gmail.com',team_leader: 'Jyoti Mishra',status: 'Active',inactive_date: '18-Sep',

            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:12, doj: '24-Sep',designation: 'Agent',name: 'srivas',gender: 'Female',email: 'srivastavarishu173@gmail.com',team_leader: 'Mansi Kushwaha',status: 'Active',inactive_date: '24-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:13, doj: '10-Sep',designation: 'Agent',name: 'Sarita',gender: 'Female',email: 'Saritakm1607@gmail.com',team_leader: 'Kanishka Srivastava',status: 'Inactive',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:14, doj: '10-Sep',designation: 'Agent',name: 'Vkanch',gender: 'Female',email: 'Vkanchan781@gmail.com',team_leader: 'Kanishka Srivastava',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:15, doj: '10-Sep',designation: 'Agent',name: 'choura',gender: 'Female',email: 'chourasiashivangishivangi@gmail.com',team_leader: 'Astuti Singh',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:16, doj: '10-Sep',designation: 'Agent',name: 'rinkij',gender: 'Female',email: 'rinkijha689@gmail.com',team_leader: 'Kanishka Srivastava',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:17, doj: '10-Sep',designation: 'Agent',name: 'pinkee',gender: 'Female',email: 'pinkee221001@gmail.com',team_leader: 'Kanishka Srivastava',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:17, doj: '10-Sep',designation: 'Agent',name: 'shaksh',gender: 'Female',email: 'shakshi1234vishwakarma@gmail.com',team_leader: 'Kanishka Srivastava',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:18, doj: '10-Sep',designation: 'Agent',name: 'Nishit',gender: 'Female',email: 'Nishitay0101@gmail.com',team_leader: 'Astuti Singh',status: 'Active',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:19, doj: '10-Sep',designation: 'Agent',name: 'khusbh',gender: 'Female',email: 'khusbh00365214@gmail.com',team_leader: 'Kanishka Srivastava',status: 'Active',inactive_date: '10-Sep' ,
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:20, doj: '10-Sep',designation: 'Agent',name: 'muskan',gender: 'Female',email: 'muskansrivastava1502@gmail.com',team_leader: 'Rajan Mishra',status: 'Inactive',inactive_date: '10-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:21, doj: '11-Sep',designation: 'Agent',name: '359975',gender: 'Female',email: '3599752@gmail.com',team_leader: 'Kanishka Srivastava',status: 'Active',inactive_date: '11-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:22, doj: '11-Sep',designation: 'Agent',name: 'shalin',gender: 'Female',email: 'shalini6163paswan@gmail.com',team_leader: 'Rajan Mishra',status: 'Active',inactive_date: '11-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:23, doj: '20 Jan',designation: 'Agent',name: 'CHAURA',gender: 'Female',email: 'CHAURASIASAKSHI2210@GMAIL.COM',team_leader: 'Kanishka Srivastava',status: 'Active',inactive_date: '20 Jan',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        },
        {id:24, doj: '12-Sep',designation: 'Agent',name: 'babli4',gender: 'Female',email: 'babli4694@gmail.com',team_leader: 'Kanishka Srivastava',status: 'Inactive',inactive_date: '12-Sep',
            attendance: [
                {Oct9: 'P',Oct10: 'P',Oct11: 'P',Oct12: 'P',Oct13: 'P',Oct14: 'WO',Oct15: 'P',Oct16: 'A',Oct17: '1/2P',Oct18: 'A',Oct19: 'P',Oct20: 'WO',Oct21: '1/2P',Oct22: 'A',Oct23: 'OGT',Oct24: 'TD',Oct25: 'A',}
            ]
        }
    ]


    const [agentDetails, setAgentDetails] =useState(agentData)

    const isAgentActive = (status) => {
        let agent = true
        if (status === 'Inactive') {
            agent = false
        }
        return agent
    }
    const changeAttendance = (agentId, day) => (event, value) => {
        agentDetails.map((agent) => {
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

                    {agentDetails && agentDetails.map((agents, index) => (
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