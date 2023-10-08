import React,{useState} from 'react'
import './tlWiseAgentReport.css'
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";



const TlWiseAgentReport = ({}) => {
    const [selectedTeamLeader, setSelectedTeamLeader] = useState()
    const [selectedTime, setSelectedTimer] = useState()
    const reportHeaders = ['Houlry Report Rajkot Date:- 7 Oct', 'Team Leader', 'Time', 'Active Agents On Data Process' , 'Active Agents On Call' ]
    const reportSubHeader = ['Name','Email','Total Attempted','Total Conncted','Total Completed','Data Process','Connectivity %','hourly attempted calls','Talk Time','hourly completed calls','hourly connected calls', 'Connectivity %']
    const tableData =  [
        ["Amit Kumar", "ak8726051@gmail.com", 41, 13, 13, 0, "31.71%", 41, 7.38, 13, 13, "31.71%"],
            ["Amit Rai", "amitrai136@gmail.com", 60, 26, 26, 0, "43.33%", 60, 15.42, 26, 26, "43.33%"],
            ["Ankit Verma", "ankitkashayap39574@gmil.com", 63, 25, 23, 0, "39.68%", 63, 16.42, 23, 25, "39.68%"],
            ["Cyril John", "johnakash487@gmail.com", 69, 21, 17, 0, "30.43%", 69, 10.1, 17, 21, "30.43%"],
            ["Krishna Gupta", "krishnagupta@gmail.com", 93, 31, 24, 0, "33.33%", 93, 20.92, 24, 31, "33.33%"],
            ["Neeraj Kumar Gupta", "neerajgupta5236@gmail.com", 38, 16, 15, 0, "42.11%", 38, 11.8, 15, 16, "42.11%"],
            ["Ravindra Kumar", "kuravindra214@gmail.com", 78, 21, 20, 0, "26.92%", 78, 14.47, 20, 21, "26.92%"],
            ["Romit Maurya", "ashokavns2002@gmail.com", 83, 30, 30, 0, "36.14%", 83, 19.23, 30, 30, "36.14%"],
            ["Sameer Kumar", "sameerkumar66913@gmail.com", 58, 31, 32, 0, "53.45%", 58, 18.43, 32, 31, "53.45%"],
            ["Satish Kumar Patel", "satishsingh07071994@gmail.com", 58, 19, 18, 0, "32.76%", 58, 11.08, 18, 19, "32.76%"],
            ["Shivam Kumar Jaishwal", "shivamjaishwal12012@gmail.com", 71, 30, 30, 0, "42.25%", 71, 22.43, 30, 30, "42.25%"],
            ["Shubham Yadav", "shubhamyadav34281@gmail.com", 74, 32, 31, 0, "43.24%", 74, 20.13, 31, 32, "43.24%"],
            ["Siddharth", "siddharthvns2002@gmail.com", 42, 16, 15, 0, "38.10%", 42, 10.58, 15, 16, "38.10%"],
            ["Sujeet Singh", "sujeetsinghhot6@gmail.com", 58, 24, 23, 0, "41.38%", 58, 22.6, 23, 24, "41.38%"],
            ["Sujit Kumar Bharti", "sujeet11796@gmail.com", 66, 20, 20, 0, "30.30%", 66, 15.3, 20, 20, "30.30%"],
            ["Utkarsh Kumar", "raosonu153@gmail.com", 47, 20, 19, 0, "42.55%", 47, 11.43, 19, 20, "42.55%"],
            ["Vikas Chaubey", "vikaspandit7187@gmail.com", 65, 23, 18, 0, "35.38%", 65, 12.95, 18, 23, "35.38%"],
            ["Vivek Kumar Singh", "vivekyadav21072003@gmail.com", 39, 18, 18, 0, "46.15%", 39, 13.07, 18, 18, "46.15%"]
        ]

    const teamLeaders = [{id: 1, name: 'Vaghela Parul Kalyanbhai'},
        {id: 2, name: 'Rajan Mishra'},
        {id: 3, name: 'Kachhadiya kriya'},
        {id: 4, name: 'Gosai Hareshpari Baldevpari'},
        {id: 5, name: 'Ravi acharya'},
        {id: 6, name: 'Malakiya komal khodabhai'},
        {id: 7, name: 'Harshvardhan Sajnani'},
        {id: 8, name: 'Lakhani Ayush'}
    ]

    const selectTeamLeader = (event, value) => {
        setSelectedTeamLeader(value)
    }
    const timesArray = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

    const selectTime = (event, value) => {
       setSelectedTimer(value)
    }

    console.log('tl',selectedTeamLeader,'time',selectedTime)

    return (
        <div className='tl-wise-agent-report-container'>
            <div className='tl-table-headers'>
                <div className='tl-report-header'>
                      <span>
                          Houlry Report Rajkot Date:- 7 Oct
                      </span>
                    <div>
                        <Autocomplete
                            className='team-leaders-dropdown'
                            disablePortal
                            id="combo-box-demo"
                            value={selectedTeamLeader}
                            onChange={selectTeamLeader}
                            options={teamLeaders.map(data => data.name)}
                            blurOnSelect={true}
                            renderInput={(params) => <TextField {...params} label={'Team Leaders'}
                            />}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            className='team-leaders-dropdown'
                            disablePortal
                            id="combo-box-demo"
                            value={selectedTime}
                            onChange={selectTime}
                            options={timesArray.map(data => data)}
                            blurOnSelect={true}
                            renderInput={(params) => <TextField {...params} label={'Report Time'}/>}
                        />
                    </div>

                    <span>
                        Active Agents On Data Process 1
                    </span>
                    <span>
                       Active Agents On Call 15

                    </span>
                </div>
                <div className='tl-table-sub-headers'>
                    <table className="table">
                        <thead>
                        <tr>
                            {reportSubHeader &&
                                reportSubHeader.map((subHeader, index) => (
                                    <th className='tl-table-sub-header' key={index}>
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
                                  {tableItem && tableItem.map((item) => (
                                          <td>
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