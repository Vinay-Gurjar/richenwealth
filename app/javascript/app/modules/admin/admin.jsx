import React, {useContext, useEffect, useState} from "react";
import './admin.css'
import CreateCallCenter from "./createCallCenter/createCallCenter";
import AutoCompleteDropdown from "../autoCompleteDropdown/autoCompleteDropdown";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {ApiContext} from "../ApiContext";

const Admin = () => {
    const {userDetails} = useContext(ApiContext)
    const [stateList, setStateList] = useState([])
    const [stateId, setStateId] = useState()
    const [callCenterList, setCallCenterList] = useState([])
    const [ccId, setCcId] = useState([])
    const [shiftTimeList, setShiftTimeList] = useState([])
    const [shortText, setShortText] = useState();
    const [ccShiftId, setCcShiftId] = useState([])
    const userField = ['Name', 'Phone Number', 'Email', 'Gender', 'DOJ']
    const [isNewCc, setIsNewCc] = useState(false)
    const [ccName, setCcName] = useState()
    const [role, setRole] = React.useState();
    const config = {
        headers: {
            'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
        }
    }

    const getStates = () => {
        return axios.get('/api/user/call_center/states_list', {
            params: {
                // date: date
            },
            headers: config.headers
        })
            .then((response) => {
                setStateList(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    const getCallCenters = (sId) => {
        return axios.get('/api/user/call_center/call_centers_list', {
            params: {
                state_id: sId
            },
            headers: config.headers
        })
            .then((response) => {
                setCallCenterList(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    const callCenterShifts = (ccId) => {
        return axios.get('/api/user/call_center/all_shifts', {
            params: {
                cc_id:ccId
            },
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
            }
        })
            .then((response) => {
                setShiftTimeList(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }


    useEffect(() => {
        getStates()
    }, [])

    const jsonForm =
        {
            is_new_cc: isNewCc,
            state_id: stateId,
            shift_time_id: ccShiftId,
            cc_id: ccId,
            cc_name: ccName,
            role: role
        }

    const changeCcId = (event) => {
        setCcId(event.id)
        callCenterShifts(event.id)
    }


    const changeCcShiftId = (event) => {
        setCcShiftId(event.id)
    }

    const createUser = () => {
        return axios.post('/api/user/call_center/create_user', jsonForm,config)
            .then((response) => {
                console.log(response.data.data)
                return response.data;
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    }

    const handleText = (type) => (event) => {
        let value = event.target.value
        if (type === 'Phone Number') {
            value = handlePhoneNumber(event)
        }

        jsonForm[type.toLowerCase().replace(/\s+/g, '_')] = value
    }


    const changeStateId = (event) => {
        setStateId(event.id)
        getCallCenters(event.id)
    }

    useEffect(() => {
        if (userDetails?.roles.includes('admin') ) {
            getCallCenters('')
        }


    },[])

    const createNewCc = () => {
        setIsNewCc(true)
        callCenterShifts()
    }

    const setRoles = (event) => {
        setRole(event.target.value)
    }

    const handlePhoneNumber = (event) => {
        const phoneNumber = event.target.value.replace(/[^\d०१२३४५६७८९]/g, ''); // Remove non-numeric and non-Hindi digit characters
        if (/^[5-9५६७८९]/.test(phoneNumber)) {
            event.target.value = phoneNumber;
        } else {
            event.target.value = ''; // Clear the input value if it doesn't start with 5-9 or a Hindi digit
        }
        return event.target.value
    }


    const submit = () => {
        createUser()
    }
    return (

        <div className="create-call-center">
            <div style={{display: 'flex'}}>

                {userDetails?.roles.includes('super_admin') &&
                    <AutoCompleteDropdown
                        listArray={stateList}
                        name={'State'}
                        onChangeValue={changeStateId}
                        selectedValue={stateId}
                        compareValue={'name'}
                        borderNone={'true'}
                        width={'15rem'}
                    />
                }
                {!isNewCc &&
                    <>
                        <AutoCompleteDropdown
                            listArray={callCenterList}
                            name={'Call Center'}
                            onChangeValue={changeCcId}
                            selectedValue={ccId}
                            compareValue={'name'}
                            borderNone={'true'}
                            width={'15rem'}
                        />
                    </>
                }
                <AutoCompleteDropdown
                    listArray={shiftTimeList}
                    name={'Call Center Shift'}
                    onChangeValue={changeCcShiftId}
                    selectedValue={ccShiftId}
                    compareValue={'name'}
                    borderNone={'true'}
                    width={'20rem'}
                />

                {!isNewCc &&
                    <Button onClick={createNewCc}>New Call Center</Button>
                }

                {
                    isNewCc &&
                    <>
                        <TextField
                            style={{width: '15rem'}}
                            id="outlined-basic"
                            label={'Call Center Name'}
                            fullWidth
                            variant="outlined"
                            required={true}
                            value={shortText}
                            onChange={handleText}
                            inputProps={{
                                type: 'text',
                                maxLength: 25,
                                inputMode: 'text'
                            }}
                        />
                    </>
                }

                <div className="user-roles-container">
                    <FormControl>
                        {/*<FormLabel id="demo-row-radio-buttons-group-label">Roles</FormLabel>*/}
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={setRoles}
                        >
                            <FormControlLabel
                                value="disabled"
                                disabled
                                control={<FormLabel/>}
                                label="Roles"
                            />
                            {userDetails?.roles.includes('super_admin') &&
                                <FormControlLabel value="admin" control={<Radio/>} label="Admin"/>
                            }
                            <FormControlLabel value="call_center_manager" control={<Radio/>} label="Call Center Manager"/>
                            <FormControlLabel value="team_lead" control={<Radio/>} label="Team Leader"/>
                            <FormControlLabel value="agent" control={<Radio/>} label="Agent"/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>



            <div className="user-form">
                {userField && userField.map((field) => (
                    <TextField
                        id="outlined-basic"
                        label={field === 'DOJ' ? `${field} DD/MM/YYYY` : field}
                        variant="outlined"
                        required={true}
                        value={shortText}
                        onChange={handleText(field)}
                        inputProps={{
                            type: 'text',
                            maxLength: 25,
                            inputMode: 'text'
                        }}
                    />
                ))}
            </div>

            <div className='admin-submit'>
                <Button onClick={submit}>
                    Submit
                </Button>
            </div>
        </div>
    )
}


export default Admin