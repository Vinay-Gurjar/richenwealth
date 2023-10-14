import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApiContext} from "./modules/ApiContext";

import './app.scss';
import {Navigate} from "react-router";
import HomeComponent from "./modules/home/homeComponent";
import HeaderBar from "./modules/header/header";
import Attendance from "./modules/attendace/attendance";
import MinimumCallConnected from "./modules/minimumCallConnected/minimumCallConnected";

const IndexRoutes = () => {
    return(
            <Routes>
                <Route path="/" element={<Attendance />} />
                <Route path="/minimum_calls_connected" element={<MinimumCallConnected />} />
            </Routes>
    )
}

function App() {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('auth_token'))
    return (
        <>
            <ApiContext.Provider  value={{setIsLogin}} >

                <HeaderBar />
                {isLogin ? <IndexRoutes /> :
                    <Routes>
                        <Route path='/' element={<HomeComponent/>}/>
                    </Routes>
                }
            </ApiContext.Provider>

        </>
    );
}

export default App;
