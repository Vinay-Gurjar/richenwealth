import React, {useContext, useEffect, useState} from 'react';
import './attendanceDashboard.css'
import Tooltip from "@mui/material/Tooltip";
import Autocomplete from "@mui/material/Autocomplete";
import {getFullDate, isValuePresent} from "../../utils";
import {TextField} from "@mui/material";
import axios from "axios";
import {ApiContext} from "../ApiContext";

const AttendanceDashboard = ({}) => {
    const {minimumCallsDate,callCenterShift} = useContext(ApiContext)
    const [headers, setHeaders] = useState([])
    const [tableDada, settableData] = useState([])
    const dashboardHeader = ['Team Leader','Present','Absent','Half Day','OGT','10:00 AM','11:00 AM','12:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','Total Left','Total Join']
    const teamLeaders = [
        ['AbhisheDASDSDSADSASDk Mishra', '20', '2', '1', '3', '0', '1', '0', '0', '-2/1', '1', '-1', '0', '-1', '-1','2','4'],
        ['Anushka', '18', '3', '4', '3', '1', '0', '0', '0', '0', '1', '-1', '0', '-1', '0','2','4'],
        ['Astuti Singh', '15', '5', '5', '3', '0', '0', '0', '0', '2/-1', '1', '-1', '0', '-1', '0','2','4'],
        ['Jyoti Mishra', '20', '3', '1', '3', '0', '0', '0', '0', '2/-1', '1', '0', '0', '-1', '0','2','4'],
        ['Kanishka Srivastava', '20', '0', '1', '3', '0', '1', '0', '0', '2', '1', '0', '0', '0', '0','2','4'],
        ['Mannu Rai', '17', '2', '1', '3', '1', '0', '0', '0', '1', '1', '0', '0', '0', '0','2','4'],
        ['Mansi Kushwaha', '20', '0', '2', '3', '0', '0', '0', '0', '3', '1', '0', '0', '0', '0','2','4'],
        ['Pawan Kumar', '20', '1', '1', '3', '0', '0', '0', '0', '2', '1', '-1', '0', '0', '0','2','4'],
        ['Rajan Mishra', '16', '0', '3', '3', '0', '0', '0', '0', '-2/1', '1', '-1', '0', '0', '0','2','4'],
        ['Rajesh Kumar Singh', '20', '1', '1', '3', '0', '0', '0', '0', '3', '1', '-1', '0', '0', '0','2','4'],
        ['Shreyash Mishra', '22', '1', '4', '-1', '0', '0', '0', '0', '1', '1', '-1', '0', '0', '0','2','4']
    ]

    const getDetails = () => {
        return axios.get('/api/reports/team_leader/agents_attendance_report',{
            params: {
                cc_id: '',
                shift_id: callCenterShift,
                date: minimumCallsDate,
            },
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
            }
        })
            .then((response) => {
                setHeaders(response.data.headers)
                settableData(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }


    const whatsAppData = () => {
        return axios.get('/api/user/whatsapp',{
            params: {
                cc_id: '',
                shift_id: callCenterShift,
                date: minimumCallsDate,
            },
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
            }
        })
            .then((response) => {
                setHeaders(response.data.headers)
                settableData(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    useEffect(() => {
        if (isValuePresent(callCenterShift) && isValuePresent(minimumCallsDate)) {
            getDetails()
        }
    }, [callCenterShift]);

    useEffect(() => {
        if (isValuePresent(callCenterShift) && isValuePresent(minimumCallsDate)) {
            getDetails()
        }
    }, [minimumCallsDate]);

    const conditionalStyles = (value , index) => {
        let styles = {}
        if (index === 1 && value !== 0) {
           styles = {background: '#b7e1cd'}
        }
        if (index === 2 && value !== 0) {
            styles = {color: '#ff0000'}
        }
        if (index > 4) {
            if (value > 0) {
                styles = {color: '#34a853', background: '#ffe599'}
            }
            if (value < 0) {
                styles = {color: '#ff0000', background: '#d5a6bd'}
            }
        }
        return styles
    }

    return (
        <div className='dashboard-main-container'>
            <span onClick={() => whatsAppData()}> whats app</span>
            <table className="table attendance-dashboard-table">
                <thead style={{ overflowX: 'hidden' }}>
                <tr>
                    {headers &&
                        headers.map((subHeader, index) => (
                            <th style={{}} className='dash-table-header' key={index}>
                                {subHeader}
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody style={{ overflowX: 'hidden' }}>
                {tableDada && tableDada.map((agents,rowIndex) => (
                    <tr className='td-row' key={rowIndex}>
                        {agents && Object.values(agents).map((agent,agentIndex) => (
                            <td style={agent === '0' ? {} : conditionalStyles(parseInt(agent), agentIndex) } key={agentIndex} className={agentIndex === 0 ?'font-1rem common-td' : 'common-td'}>
                                    <span >{agent === '0' ? '' : agent }</span>
                                </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default AttendanceDashboard