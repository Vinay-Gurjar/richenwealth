import React, {useState, useEffect, useContext} from 'react'
import './tlWiseAgentReport.css'
import axios from "axios";
import DatePickerComp from "../datePicker/datePickerComp";
import {ApiContext} from "../ApiContext";
import AutoCompleteDropdown from "../autoCompleteDropdown/autoCompleteDropdown";
import {isValuePresent} from "../../utils";



const TlWiseAgentReport = ({}) => {
    const {timeList} = useContext(ApiContext)
    const [selectedTeamLeader, setSelectedTeamLeader] = useState()
    const [callCenterName, setCallCenterName] = useState('')
    const [agentOnCall, setAgentOnCall] = useState(0)
    const [agentOnDateEntry, setAgentOnDateEntry] = useState(0)
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [reportSubHeader, setReportSubHeader] = useState([])
    const [tableData, setTableData] = useState([])
    const [teamLeaders, setTeamLeaders] =useState([])
    const config = {
        headers: {
            'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
        }
    }

    const getTeamLeaders = () => {
        return axios.get('/api/user/call_center/team_leaders', {
            params: {
                date: date
            },
            headers: config.headers
        })
            .then((response) => {
                setTeamLeaders(response.data.data)
                setCallCenterName(response.data.center_details)
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

    const hourlyReport = () => {
        return axios.get('api/reports/agents/hourly_report', {
            params: {
                date: date,
                rt_id: time,
                tl_id: selectedTeamLeader
            },
            headers: config.headers
        })
            .then((response) => {
                setTableData(response.data.data)
                setAgentOnCall(response.data.agents_on_call)
                setCallCenterName(response.data.center_details)
                setAgentOnDateEntry(response.data.agents_on_de)
                setReportSubHeader(response.data.report_header)
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    };

    useEffect(() => {
       if (isValuePresent(selectedTeamLeader) && isValuePresent(date) && isValuePresent(time)) {
           hourlyReport()
       }
    }, [selectedTeamLeader]);

    useEffect(() => {
        if (isValuePresent(selectedTeamLeader) && isValuePresent(date) && isValuePresent(time)) {
            hourlyReport()
        }
    }, [date]);

    useEffect(() => {
        if (isValuePresent(selectedTeamLeader) && isValuePresent(date) && isValuePresent(time)) {
            hourlyReport()
        }
    }, [time]);

    const selectTeamLeader = (value) => {
        setSelectedTeamLeader(value.id)
    }

    const setReportDate = (date) => {
        setDate(date)
    }

    const setSelectedTime = (value) => {
        setTime(value.id)
    }


    return (
        <div className='tl-wise-agent-report-container'>
            <div className='tl-table-headers'>
                <div className='tl-report-header dotted-boarder '>
                      <span>
                         {`${callCenterName}`}
                      </span>
                    <AutoCompleteDropdown
                        listArray={teamLeaders}
                        name={'Team Leader'}
              head          onChangeValue={selectTeamLeader}
                        selectedValue={selectedTeamLeader}
                        compareValue={'name'}
                        width={'15rem'}
                        borderNone={'true'}
                    />
                    <DatePickerComp reportDate={setReportDate} borderNone={'true'} />
                        <AutoCompleteDropdown
                            listArray={timeList}
                            name={'Time'}
                            onChangeValue={setSelectedTime}
                            selectedValue={time}
                            compareValue={'time'}
                            borderNone={'true'}
                        />
                    <span>
                     Active Agents On Data Process: {agentOnDateEntry}
                    </span>
                    <span>
                       Active Agents On Call: {agentOnCall}
                    </span>
                </div>
                <div className='tl-table-sub-headers'>
                    <table className="table">
                        <thead>
                        <tr>
                            {reportSubHeader &&
                                reportSubHeader.map((subHeader, index) => (
                                    <th className='tl-table-sub-header dotted-boarder ' key={index}>
                                        {subHeader.split(' ').map((word, wordIndex) => (
                                            <div key={wordIndex}>{word}</div>
                                        ))}
                                    </th>
                                ))}
                        </tr>
                        </thead>
                        <tbody>
                        {tableData && tableData.map((tableItem) => (
                              <tr>
                                  {tableItem && tableItem.map((item, itemIndex) => (
                                          <td class={`dotted-boarder hourly-report-value-${itemIndex > 6 ? item > 54 ? 'green-fc' : item < 40 ? 'red-fc' : '' : ''}
                                            hourly-report-value-${itemIndex === 6 ? parseFloat(item) < 30 ? 'red-bg' : '' : ''}
                                               hourly-report-value-${itemIndex === 11 ? parseFloat(item) < 35 ? 'red-fc' : '' : ''}` }>
                                              {item}
                                          </td>
                                  ))}
                              </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TlWiseAgentReport