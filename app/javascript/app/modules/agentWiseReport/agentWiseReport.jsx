import React, {useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";
import './agentWiseReport.css'
import DatePickerComp from "../datePicker/datePickerComp";

const agentWiseReport = ({}) => {
    const [selectedTeamLeader, setSelectedTeamLeader] = useState()
    const [selectedAgent, setSelectedAgent] = useState()
    const [date, setDate] = useState()

    const teamLeaders = [{id: 1, name: 'Vaghela Parul Kalyanbhai'},
        {id: 2, name: 'Rajan Mishra'},
        {id: 3, name: 'Kachhadiya kriya'},
        {id: 4, name: 'Gosai Hareshpari Baldevpari'},
        {id: 5, name: 'Ravi acharya'},
        {id: 6, name: 'Malakiya komal khodabhai'},
        {id: 7, name: 'Harshvardhan Sajnani'},
        {id: 8, name: 'Lakhani Ayush'}
    ]

    const agentArray = [
        {id: 1, name: 'Anmol singh rajput - anmolrajput10.2003@gmail.com'},
        {id: 2, name: 'krishna soni  - shivasonihh@gmail.com'},
        {id: 3, name: 'Ayush singh sonar  - ayushsonar987@gmail.com'},
        {id: 4, name: 'Asha mandrai - mandraiasha@gmail.com'},
        {id: 5, name: 'Pratiksha prajapati - pratikshaprajapati74@gmail.com'},
        {id: 6, name: 'Harshita Hirekhan - harsha.hirekhan123@gmail.com'},
        {id: 7, name: 'Deepika Choudhary - dc855784@gmail.com'},
        {id: 8, name: 'Rashmi Singh - srashmisingh55@gmail.com'},
        {id: 9, name: 'Diti Barsiya  - diti20barsiya@gmail.com'},
        {id: 10, name: 'animesh rathore - animeshavirathore@gmail.com'},
        {id: 11, name: 'piyush sharma - piyushsharm@gmail.com'},
        {id: 12, name: 'sona rai - raisona477@gmail.com'},
        {id: 13, name: 'suruchi ahirwar - ahirwarsuruchi267@gmail.com'},
        {id: 14, name: 'riya malviya - riyamalviya6261@gmail.com'},
        {id: 15, name: 'KRITI GIRI - kritigiri763@gmail.com'},
        {id: 16, name: 'Rohit Pandey  - pandeyrohit1226@gmail.com'},
        {id: 17, name: 'Harsh Shrivas - harshshrivas605@gmail.com'},
        {id: 18, name: 'SONALI SEN - ssen38506@gmail.com'},
        {id: 19, name: 'POONAM GURJAR - spoonamgurjar21@gmail.com'},
        {id: 20, name: 'POORNIMA SEN - khushboosen28@gmail.com'},
        {id: 21, name: 'Prachi Kurmi - pk8739511@gmail.com'},
        {id: 22, name: 'Manisha Ahirwar - manishahirwar307@gmail.com'},
    ]

    const selectTeamLeader = (event, value) => {
        setSelectedTeamLeader(value.id)
    }

    const selectAgent = (event, value) => {
        setSelectedAgent(value.id)
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
                    <Autocomplete
                        className='team-leaders-dropdown'
                        id="combo-box-demo"
                        options={teamLeaders}
                        value={teamLeaders.find(value => value.id === selectedTeamLeader) || null}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name || ""}
                        onChange={selectTeamLeader}
                        blurOnSelect={true}
                        renderInput={(params) => <TextField {...params} label={'Team Leaders'}
                        />}
                    />
                </div>
                <div>
                    <Autocomplete
                        className='team-leaders-dropdown'
                        id="combo-box-demo"
                        options={agentArray}
                        value={agentArray.find(value => value.id === selectedAgent) || null}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name || ""}
                        onChange={selectAgent}
                        blurOnSelect={true}
                        renderInput={(params) => <TextField {...params} label={'Agents name & Email'}
                        />}
                    />
                </div>
                <DatePickerComp reportDate={setReportDate} />
            </div>

            <div className='agents-overall-report'>
                {agentReport && agentReport.map((reports, index) => (
                    <div key={index} className="agent-report-overview">
                        <div className='agent-report-time'>
                            <span>{reports.report_time}</span>
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
