import React, {useState,useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApiContext} from "./modules/ApiContext";
import './app.scss';
import {Navigate} from "react-router";
import HomeComponent from "./modules/home/home.component";
import {isValuePresent} from "./utils";
import BackDrop from "./modules/back-drop/backDrop";
import HomePage from "./modules/home/HomePage";``

const IndexRoutes = () => (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
    </>
);

const AdminRoute = () => (
    <Routes>
    {/*<Route path="/sup_admin" element={<Admin />} />*/}
    </Routes>
);

function App() {
    const [userDetails, setUserDetails] = useState()
    const [isLogin, setIsLogin] = useState(false)
    const [loader, setLoader] = useState(true)


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


    const componentPath = () => {
        if (userDetails?.roles?.includes('super_admin')) {
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
    };

    return (
        <>
            <ApiContext.Provider  value={{
                isLogin,setIsLogin,setUserDetails,userDetails,config }} >
                {loader &&
                    <BackDrop toggle={loader}/>
                }
                {componentPath()}
            </ApiContext.Provider>
        </>
    );
}

export default App;
