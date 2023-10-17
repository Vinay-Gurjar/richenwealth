import React, {useContext, useEffect, useState} from 'react';
import { Toolbar, Select, MenuItem, Icon } from '@material-ui/core';
import './header.css'; // Import your CSS file
import MenuIcon from '../../../../../app/assets/images/menuIcon.svg'
import SaralIcon from '../../../../../app/assets/images/saralLogo.svg'
import {FormControl, InputLabel} from "@mui/material";
import {ApiContext} from "../ApiContext";
import {createSearchParams, useSearchParams} from 'react-router-dom';
import {attendancePath, isValuePresent} from "../../utils";

const HeaderBar = ({}) => {
    const {setIsLogin, userDetails, setUserDetails, setAttendanceYear, setAttendanceMonth, setAttendanceDays} = useContext(ApiContext)
    const [name, setName] =  useState ('')
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());// January
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [searchParams] = useSearchParams();
    const getDaysInMonth = () => {
        const year = selectedYear;
        const month = selectedMonth;
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        const days = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    };

    const monthDays = [...getDaysInMonth().map(day => {
        const dayOfMonth = day.getDate().toString().padStart(2, '0');
        const monthName = day.toLocaleString('default', { month: 'short' });
        return `${monthName} ${dayOfMonth}`;
    }),];


    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };
    useEffect(() => {
        setAttendanceDays(monthDays)
        setAttendanceMonth(selectedMonth)
        setAttendanceYear(selectedYear)
    },[selectedMonth])


    return (
        <Toolbar className="header-bg" id="header">
            <div className="left-header-container">
                {/*<MenuIcon className="" />*/}
                {/*<SaralIcon className="saral-icon" />*/}
                <img src={'../../../../../public/assets/image/menuIcon.svg'}/>
                <img src={'../../../../../public/assets/image/saralLogo.svg'}/>
                <span className="navbar-header-title"> भारतीय जनता पार्टी </span>
            </div>
            {isValuePresent(userDetails) && window.location.pathname === attendancePath &&
                <>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-simple-select-label">Shift</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={language}
                                // label="Shift"
                                // onChange={changeLang}
                            >
                                <MenuItem value={'en'}>08 AM to 3 PM</MenuItem>
                                <MenuItem value={'hn'}>09 AM to 6 PM</MenuItem>
                                <MenuItem value={'tl'}>3 PM to 9 PM</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='attendance-dropdowns'>
                        <FormControl sx={{m: 1, minWidth: 120}} size="small">
                            <InputLabel id="demo-simple-select-label">Years</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedYear}
                                // label="Attendance Year"
                                onChange={handleYearChange}
                            >
                                {Array.from({length: 10}, (_, i) => (
                                    <MenuItem key={i} value={new Date().getFullYear() - i}>
                                        {new Date().getFullYear() - i}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{m: 1, minWidth: 120}} size="small">
                            <InputLabel id="demo-simple-select-label">Months</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedMonth}
                                // label="Attendance Month"
                                onChange={handleMonthChange}
                            >
                                {Array.from({length: 12}, (_, i) => (
                                    <MenuItem key={i} value={i}>
                                        {new Date(selectedYear, i).toLocaleString('default', {month: 'short'})}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </>

            }
            <div>
                <div className="language-setting-container mt-3">
                </div>
                <div className="right-header-content">
                    <div className="user-profile-container">
                        <span className="user-name">{userDetails?.name}</span>
                    </div>

                    {/* Only Screen For Mobile */}
                    <div className="user-profile-container-mobile">{/* Mobile content */}</div>
                </div>
            </div>
        </Toolbar>
    );
};

export default HeaderBar;
