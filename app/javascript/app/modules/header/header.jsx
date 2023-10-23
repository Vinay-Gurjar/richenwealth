import React, {useContext, useEffect, useState} from 'react';
import { Toolbar, Select, MenuItem, Icon } from '@material-ui/core';
import './header.css'; // Import your CSS file
import {FormControl, InputLabel} from "@mui/material";
import {ApiContext} from "../ApiContext";
import {attendanceDashboard, attendancePath, isValuePresent, minimumCallConnected} from "../../utils";
import axios from "axios";
import AutoCompleteDropdown from "../autoCompleteDropdown/autoCompleteDropdown";
import DatePickerComp from "../datePicker/datePickerComp";
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import {useNavigate} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers,
    faFileArrowUp,
    faListCheck,
    faIndustry,
    faCircleInfo,
    faNetworkWired } from '@fortawesome/free-solid-svg-icons'

const HeaderBar = ({}) => {
    const {userDetails,minimumCallsTime, setMinimumCallsTime,
        callCenterShift, timeList, setTimeList, setCallCenterShift,
        setAttendanceYear, setAttendanceMonth, setAttendanceDays, setMinimumCallsDate} = useContext(ApiContext)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [ccTiming, setCcTiming] = useState([]);
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });


    useEffect(() => {
        if (isValuePresent(timeList)) {
            setMinimumCallsTime(timeList[0].id)
        }
    },[timeList])

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

    const CallCenterShifts = () => {
        return axios.get('/api/user/call_center/shift',{
            params: {
                user_id: userDetails.id,
            },
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
            }
        })
            .then((response) => {
                setCcTiming(response.data.data)
                setCallCenterShift(response.data.data[0]?.id)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    const reportTiming = (callCenterShift) => {
        return axios.get('/api/user/call_center/shift/timing',{
            params: {
                shift_id: callCenterShift,
            },
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
            }
        })
            .then((response) => {
                setTimeList(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    useEffect(() => {
        if (isValuePresent(userDetails)) {
            CallCenterShifts()
        }
    },[userDetails])

    const changeShift = (event) => {
        setCallCenterShift(event.id)
    }

    useEffect(() => {
        if (isValuePresent(callCenterShift)) {
            reportTiming(callCenterShift)
        }
    },[callCenterShift])


    const setMinimumCallTime = (event) => {
        setMinimumCallsTime(event.id)
    }

    const setReportDate = (date) => {
        setMinimumCallsDate(date)
    }


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const componentsRoute = [
        {name: 'Attendance', path: '/', icon: <FontAwesomeIcon className='list-icon' icon={faUsers} /> },
        {name: 'Upload Files', path: 'upload_files', icon: <FontAwesomeIcon className='list-icon' icon={faFileArrowUp} />},
        {name: 'Hourly Report', path: 'hourly_report', icon: <FontAwesomeIcon className='list-icon' icon={faListCheck} />},
        {name: 'Agent Wise Report', path: 'agent_wise_report', icon: <FontAwesomeIcon className='list-icon' icon={faIndustry} />},
        {name: 'Attendance DashBoard', path: 'attendance_dashboard', icon: <FontAwesomeIcon className='list-icon' icon={faCircleInfo} />},
        {name: 'minimum Calls Connected',path: 'minimum_calls_connected', icon: <FontAwesomeIcon className='list-icon' icon={faNetworkWired} />}
    ]

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <h1> Close List </h1>

            <List>
                {componentsRoute.map((text) => (
                    <ListItem key={text.path} disablePadding>
                        <ListItemButton onClick={() => navigateToPages(text.path, '')}>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const navigateToPages = (pathName, state) => {
        navigate({
            pathname: pathName
        }, {
            state: {
                state
            }
        });
    }

    return (
        <Toolbar className="header-bg" id="header">
            <div className="left-header-container">
                <div>
                    {['left'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <MenuIcon onClick={toggleDrawer(anchor, true)} className="menu-icon" />
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                {list(anchor)}
                            </Drawer>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            { isValuePresent(userDetails) &&
                <div>
                    <AutoCompleteDropdown
                        listArray={ccTiming}
                        name={'Shift Time'}
                        onChangeValue={changeShift}
                        selectedValue={callCenterShift}
                        compareValue={'time'}
                        width={'15rem'}
                        borderNone={'true'}
                    />
                </div>

            }
            {isValuePresent(userDetails) && window.location.pathname === attendancePath &&
                <>
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
            { window.location.pathname === minimumCallConnected || window.location.pathname === attendanceDashboard ?
                    <DatePickerComp reportDate={setReportDate} borderNone={'true'}/> : ''
            }
            { window.location.pathname === minimumCallConnected &&
                    <AutoCompleteDropdown
                        listArray={timeList}
                        name={'Time'}
                        onChangeValue={setMinimumCallTime}
                        selectedValue={minimumCallsTime}
                        compareValue={'time'}
                        borderNone={'true'}
                    />
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
