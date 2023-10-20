import React, {useEffect, useState} from "react";
import './agentWiseReport.css'
import DatePickerComp from "../datePicker/datePickerComp";
import axios from "axios";
import AutoCompleteDropdown from "../autoCompleteDropdown/autoCompleteDropdown";
import {isValuePresent} from "../../utils";

const agentWiseReport = ({}) => {
    const [selectedTeamLeader, setSelectedTeamLeader] = useState()
    const [selectedAgent, setSelectedAgent] = useState()
    const [date, setDate] = useState()
    const [teamLeaders, setTeamLeaders] =useState([])
    const [agents, setAgents] =useState([])
    const [agentReports, setAgentReports] =useState([])

    const config = {
        headers: {
            'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
        }
    }

    const getTeamLeaders = () => {
        return axios.get('/api/user/call_center/team_leaders', {
            params: {
                // date: date
            },
            headers: config.headers
        })
            .then((response) => {
                setTeamLeaders(response.data.data)
                // setCallCenterName(response.data.center_details)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    useEffect(() => {
        getTeamLeaders()
    }, []);


    const getAgents = (tlId) => {
        return axios.get('/api/user/call_center/team_leader/agents', {
            params: {
                tl_id: tlId
            },
            headers: config.headers
        })
            .then((response) => {
                setAgents(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    const getAgentDetails = () => {
        return axios.get('/api/reports/agent/all_day_report', {
            params: {
                agent_id: selectedAgent,
                date:date
            },
            headers: config.headers
        })
            .then((response) => {
                setAgentReports(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    useEffect(() => {
       if (isValuePresent(date) && isValuePresent(selectedAgent)) {
           getAgentDetails()
       }
    },[date])

    useEffect(() => {
        if (isValuePresent(date) && isValuePresent(selectedAgent)) {
            getAgentDetails()
        }
    },[selectedAgent])

    const selectTeamLeader = (event) => {
        setSelectedTeamLeader(event.id)
        getAgents(event.id)
    }

    const selectAgent = (event) => {
        setSelectedAgent(event.id)
    }

    const agentReport = [
        {
            report_time: "09AM TO 10AM",
            report_header: ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity'],
            report_value: ['Rajnish Kumar', '40', '7.88', '10', '18', '45%']
        },
        {
            report_time: "09AM TO 10AM",
            report_header: ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity'],
            report_value: ['Rajnish Kumar', '40', '7.88', '10', '18', '45%']
        },
        {
            report_time: "09AM TO 10AM",
            report_header: ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity'],
            report_value: ['Rajnish Kumar', '40', '7.88', '10', '18', '45%']
        },
        {
            report_time: "09AM TO 10AM",
            report_header: ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity'],
            report_value: ['Rajnish Kumar', '40', '7.88', '10', '18', '45%']
        },
        {
            report_time: "09AM TO 10AM",
            report_header: ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity'],
            report_value: ['Rajnish Kumar', '40', '7.88', '10', '18', '45%']
        },
        {
            report_time: "09AM TO 10AM",
            report_header: ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity'],
            report_value: ['Rajnish Kumar', '40', '7.88', '10', '18', '45%']
        },
        {
            report_time: "09AM TO 10AM",
            report_header: ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity'],
            report_value: ['Rajnish Kumar', '40', '7.88', '10', '18', '45%']
        },
        {
            report_time: "09AM TO 10AM",
            report_header: ['Agent Name', 'Hourly attempted calls', 'Talk Time', 'Hourly completed calls', 'Hourly connected calls', 'Connectivity'],
            report_value: ['Rajnish Kumar', '40', '7.88', '10', '18', '45%']
        }
        ]


    const setReportDate = (date) => {
        setDate(date)
    }

    return (
        <>
            <div className='agent-report-header'>
                <div>
                    <AutoCompleteDropdown
                        listArray={teamLeaders}
                        name={'Team Leader'}
                        onChangeValue={selectTeamLeader}
                        selectedValue={selectedTeamLeader}
                        compareValue={'name'}
                        width={'15rem'}
                        borderNone={'true'}
                    />
                </div>
                <div>
                    <AutoCompleteDropdown
                        listArray={agents}
                        name={'Agents name & Email'}
                        onChangeValue={selectAgent}
                        selectedValue={selectedAgent}
                        compareValue={'name'}
                        width={'20rem'}
                        borderNone={'true'}
                    />
                </div>
                <DatePickerComp reportDate={setReportDate} borderNone={'true'}/>
            </div>

            <div className='agents-overall-report'>
                {agentReports && agentReports.map((reports, index) => (
                    <div key={index} className="agent-report-overview">
                        <div className='agent-report-time'>
                            <span>{reports?.report_time}</span>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    {reports.report_header &&
                                        reports.report_header.map((subHeader, index) => (
                                            <th className='agent-table-header' key={index}>
                                                {subHeader}
                                            </th>
                                        ))}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {reports.report_value && reports.report_value.map((tableItem) => (
                                        <td>
                                            {tableItem}
                                        </td>
                                    ))}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default agentWiseReport
