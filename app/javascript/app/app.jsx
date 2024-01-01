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

const IndexRoutes = () => (
    <>
    <Routes>
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/minimum_calls_connected" element={<MinimumCallConnected />} />
        <Route path="/upload_files" element={<FileUpload />} />
        <Route path="/hourly_report" element={<TlWiseAgentReport />} />
        <Route path="/agent_wise_report" element={<AgentWiseReport />} />
        <Route path="/attendance_dashboard" element={<AttendanceDashboard />} />
        <Route path="/*" element={<Navigate to="/attendance" />} />
    </Routes>
    </>
);

const AdminRoute = () => (
    <Routes>
    <Route path="/sup_admin" element={<Admin />} />
    </Routes>
);

function App() {
    const [userDetails, setUserDetails] = useState()
    const [isLogin, setIsLogin] = useState(false)
    const [attendanceYear,setAttendanceYear] = useState()
    const [attendanceMonth,setAttendanceMonth] = useState()
    const [attendanceDays,setAttendanceDays] = useState()
    const [callCenterShift,setCallCenterShift] = useState()
    const [timeList, setTimeList] = useState([])
    const [loader, setLoader] = useState(true)
    const [minimumCallsTime, setMinimumCallsTime] = useState();
    const [minimumCallsDate, setMinimumCallsDate] = useState();

    useEffect(() => {
        if (isValuePresent(localStorage.getItem('user_details'))) {
            setUserDetails(JSON.parse(localStorage.getItem('user_details')))
            setIsLogin(localStorage.getItem('auth_token'))
            setLoader(false)
        } else {
            setLoader(false)
        }
    },[])

    const config = {
        headers: {
            'Authorization': localStorage.getItem('auth_token'),
        }
    }

    const bubbleSort = () => {
        const arr = [1, 4, 2, 5, 78, 9, 0, 6];
        const sa = [...arr];
        const n = sa.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (sa[j] > sa[j + 1]) {
                    [sa[j], sa[j + 1]] = [sa[j + 1], sa[j]];
                }
            }
        }

        console.log(sa);
    };


    useEffect(() => {
        // bubbleSort()
    }, []);



    const componentPath = () => {
        if (isValuePresent(userDetails)) {
            if (userDetails.roles.includes('super_admin')) {
                return (
                    <>
                        <AdminRoute />
                        <IndexRoutes />
                    </>
                );
            } else {
                return (
                    <IndexRoutes />
                );
            }
        }else {
            return (
            <Routes>
                <Route path='/' element={<HomeComponent/>}/>
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
            )
        }
    };

    return (
        <>
            <ApiContext.Provider  value={{
                isLogin,setIsLogin,callCenterShift, setCallCenterShift, setUserDetails,
                userDetails, attendanceDays, setAttendanceMonth, attendanceMonth,
                attendanceYear, setAttendanceYear, setAttendanceDays,
                timeList ,setTimeList, minimumCallsTime, setMinimumCallsTime,
                minimumCallsDate, setMinimumCallsDate, config}} >
                {loader &&
                    <BackDrop toggle={loader}/>
                }
                <HeaderBar />
                {componentPath()}
            </ApiContext.Provider>
        </>
    );
}

export default App;
