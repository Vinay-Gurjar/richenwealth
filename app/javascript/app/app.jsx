import React, {useState,useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApiContext} from "./modules/ApiContext";

import './app.scss';
import {Navigate} from "react-router";
import HomeComponent from "./modules/home/home.component";
import HeaderBar from "./modules/header/header";
import Attendance from "./modules/attendace/attendance";
import MinimumCallConnected from "./modules/minimumCallConnected/minimumCallConnected";
import {isValuePresent} from "./utils";
import BackDrop from "./modules/back-drop/backDrop";
import FileUpload from "./modules/fileUpload/fileUpload";
import TlWiseAgentReport from "./modules/tlWiseAgentReport/tlWiseAgentReport";
import AgentWiseReport from "./modules/agentWiseReport/agentWiseReport";
import AttendanceDashboard from "./modules/attendanceDashboard/attendanceDashboard";
import Admin from "./modules/admin/admin";

const IndexRoutes = () => {
    return(
            <Routes>
                <Route path="/" element={<Attendance />} />
                <Route path="/minimum_calls_connected" element={<MinimumCallConnected />} />
                <Route path="/upload_files" element={<FileUpload />} />
                <Route path="/hourly_report" element={<TlWiseAgentReport />} />
                <Route path="/agent_wise_report" element={<AgentWiseReport />} />
                <Route path="/attendance_dashboard" element={<AttendanceDashboard />} />
                <Route path="/sup_admin" element={<Admin />} />
            </Routes>
    )
}

function App() {
    const [userDetails, setUserDetails] = useState(
        isValuePresent(localStorage.getItem('user_details')) ?
                  localStorage.getItem('user_details') : '')
    const [isLogin, setIsLogin] = useState(userDetails?.auth_token)
    const [attendanceYear,setAttendanceYear] = useState()
    const [attendanceMonth,setAttendanceMonth] = useState()
    const [attendanceDays,setAttendanceDays] = useState()
    const [callCenterShift,setCallCenterShift] = useState()
    const [timeList, setTimeList] = useState([])
    const [loader, setLoader] = useState(true)
    const [minimumCallsTime, setMinimumCallsTime] = useState();
    const [minimumCallsDate, setMinimumCallsDate] = useState();
    const userEnteredWrongRoute = !['/','/sup_admin', '/minimum_calls_connected' ,'/upload_files', ,'/hourly_report' ,'/agent_wise_report','/attendance_dashboard'].includes(window.location.pathname);

    useEffect(() => {
        if (isValuePresent(localStorage.getItem('user_details'))) {
            setUserDetails(JSON.parse(localStorage.getItem('user_details')))
            setIsLogin(JSON.parse(localStorage.getItem('user_details')).auth_token)
            setLoader(false)
        } else {
            setLoader(false)
        }
    },[localStorage.getItem('user_details')])

    useEffect(() => {
        if (userEnteredWrongRoute){
            window.location.href = '/'
        }


        console.log(userEnteredWrongRoute)

    }, [userEnteredWrongRoute || userEnteredWrongRoute]);


    return (
        <>
            <ApiContext.Provider  value={{
                setIsLogin,callCenterShift, setCallCenterShift, setUserDetails,
                userDetails, attendanceDays, setAttendanceMonth, attendanceMonth,
                attendanceYear, setAttendanceYear, setAttendanceDays,
                timeList ,setTimeList, minimumCallsTime, setMinimumCallsTime,
                minimumCallsDate, setMinimumCallsDate }} >
                <HeaderBar />
                {loader ?
                    <BackDrop toggle={loader}/> :
                isLogin ? <IndexRoutes /> :
                    <Routes>
                        <Route path='/' element={<HomeComponent/>}/>
                    </Routes>
                }
            </ApiContext.Provider>
        </>
    );
}

export default App;
