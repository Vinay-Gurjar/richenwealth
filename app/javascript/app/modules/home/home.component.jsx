import React, {useState, useContext} from 'react';
import './home.styles.scss'
import axios from "axios";
import { MuiOtpInput } from 'mui-one-time-password-input'
import {isValuePresent, showErrorToast, showSuccessToast} from "../../utils";
import {ApiContext} from "../ApiContext";
import BackDrop from "../back-drop/backDrop";
import HomePageBg from '../../../../../public/images/HomePageDesign.svg';

const HomeComponent = () => {
    const {setIsLogin,setUserDetails} = useContext(ApiContext)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [identification_token, setIdentification_token] = useState()
    const [sendOtpStatus, setsendOtpStatus] = useState()
    const [otp, setOtp] = React.useState('')
    const [loader, setLoader] = React.useState(false)

    const handlePhoneNumber =(event)=>{
                const phoneNumber = event.target.value.replace(/[^\d०१२३४५६७८९]/g, ''); // Remove non-numeric and non-Hindi digit characters
                if (/^[5-9५६७८९]/.test(phoneNumber)) {
                    event.target.value = phoneNumber;
                } else {
                    event.target.value = ''; // Clear the input value if it doesn't start with 5-9 or a Hindi digit
                }
        setPhoneNumber(event.target.value);
    }

    const handleChange = (newValue) => {
        setOtp(newValue)
    }

    const sentOtp = (key) => {
        if (key === 'Enter' && phoneNumber.length > 9) {
            setLoaderTrue()
            const formData = new FormData();
            formData.append('phone_number', phoneNumber);
            return axios.post('/api/auth/user/login', formData)
                .then((response) => {
                    if (response.data.json.status) {
                        showSuccessToast(response.data.json.message)
                        setIdentification_token(response.data.json.data.identification_token);
                        setsendOtpStatus(response.data.json.status)
                        setLoaderFalse()
                        return response.data;
                    }
                })
                .catch((error) => {
                    showErrorToast(error.response.data.json.message)
                    setLoaderFalse()
                });
        }
    };

    const submitOtp = (key) => {
        if (key === 'Enter' && otp.length > 3) {
            setLoaderTrue()
            const formData = new FormData();
            formData.append('identification_token', identification_token);
            formData.append('otp', otp);
            return axios.post('/api/auth/user/submit_otp', formData)
                .then((response) => {
                    if (response.data.status) {
                        showSuccessToast(response.data.message)
                        localStorage.setItem('user_details', JSON.stringify(response.data.data))
                        localStorage.setItem('auth_token', response.data.data.auth_token)
                        setUserDetails(response.data.data)
                        setIsLogin(response.data.status)
                        setLoader(response.data.status)
                        setLoaderFalse()
                        return response.data;
                    }
                })
                .catch((error) => {
                    showErrorToast(error.response.data.json.message)
                    setLoaderFalse()
                });
        }
    };

    const setLoaderTrue = () => {
        setLoader(true)
    }
    const setLoaderFalse = () => {
        setLoader(false)
    }


    const checkOtpStatus = () =>  {
        return  isValuePresent(identification_token) && isValuePresent(sendOtpStatus)
    }

    return (
        <div className="home-page-container">
                <BackDrop toggle={loader}/>
                <HomePageBg className="home-page-des" />
            <div className="login-component" >
                <div className="login-heaging">
                    <h3 className='login-main-heading'>Welcome!</h3>
                    <h4 className="login-sub-heading">To Saral Calling Tracker</h4>
                </div>
                <div className="login-title">
                    <h5>{checkOtpStatus() || sendOtpStatus ? 'Verify' : 'Login'}</h5>
                    <p > {checkOtpStatus() ? `OTP sent to ${phoneNumber}` : 'Enter Your Phone Number'} </p>
                </div>
                <div className='input-container'>
                    {checkOtpStatus() ?
                        <MuiOtpInput onKeyPress={(e) => submitOtp(e.key)} className='otp-input' value={otp} onChange={handleChange}/>
                        :
                        <input onChange={handlePhoneNumber}
                               required={true}
                               maxLength='10'
                               value={phoneNumber}
                               onKeyPress={(e) => sentOtp(e.key)}
                               inputMode='numeric'
                               type="text"
                               className="transparent-input"
                               placeholder="Type here..."
                        />
                    }
                </div>
                <div className="login-buttons">
                    <button onClick={() => checkOtpStatus() ? submitOtp('Enter')  : sentOtp('Enter')} className='submit-button'> {checkOtpStatus() ? 'Continue' :  'GET OTP' }</button>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default HomeComponent;