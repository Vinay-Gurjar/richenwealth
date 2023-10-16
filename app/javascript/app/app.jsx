import React, {useState,useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApiContext} from "./modules/ApiContext";

import './app.scss';
import {Navigate} from "react-router";
import HomeComponent from "./modules/home/homeComponent";
import HeaderBar from "./modules/header/header";
import Attendance from "./modules/attendace/attendance";
import MinimumCallConnected from "./modules/minimumCallConnected/minimumCallConnected";
import {isValuePresent} from "./utils";
import BackDrop from "./modules/back-drop/backDrop";
import FileUpload from "./modules/fileUpload/fileUpload";

const IndexRoutes = () => {
    return(
            <Routes>
                <Route path="/" element={<Attendance />} />
                <Route path="/minimum_calls_connected" element={<MinimumCallConnected />} />
                <Route path="/upload_files" element={<FileUpload />} />
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
    const [loader, setLoader] = useState(true)

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

    }, [isLogin || userDetails]);


    return (
        <>
            <ApiContext.Provider  value={{
                setIsLogin,  setUserDetails, userDetails, attendanceDays, setAttendanceMonth, attendanceMonth, attendanceYear, setAttendanceYear, setAttendanceDays}} >
                <HeaderBar userDetails={userDetails} />
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
