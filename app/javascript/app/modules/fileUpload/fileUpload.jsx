import React, {useContext, useEffect, useState} from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShowCsvData from "../showCsvData/showCsvData";
import './fileUpload.css'
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {ApiContext} from "../ApiContext";
import {isValuePresent} from "../../utils";
import DatePickerComp from "../datePicker/datePickerComp";


const FileUpload = ({}) => {
    const {callCenterShift, timeList} = useContext(ApiContext)
    const [csvFile, setCsvFile] = useState()
    const [fileType, setFileType] = useState()
    const [selectedTime, setSelectedTime] = useState()
    const [uploadFileType, setUploadFileType] = useState('')
    const [reportDateTime, setReportDateTime] = useState('')
    const [date, setDate] = useState()
    const [invalidUsers, setInvalidUsers] = useState()

    const config = {
        headers: {
            'Authorization': `${JSON.parse(localStorage.getItem('user_details')).auth_token}`,
        }
    }
     const uploadFileTypes = ['User Upload', 'Report Upload']

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const selectTime = (event, value) => {
        setSelectedTime(value.id)
    }
    const handleFileUpload = (type) => (event) => {
        setFileType(type)
        setCsvFile(event.target.files[0])
    }

    const selectUploadReportType = (event, value) => {
        setUploadFileType(value)
    }

    const importFile = () => {
        const formData = new FormData();
        formData.append('csv_file', csvFile);
        formData.append('file_type', fileType);
        formData.append('date', date);
        formData.append('rt_id', selectedTime);
        return axios.post('/api/users/import_file', formData,config)
            .then((response) => {
                if (isValuePresent(response.data.not_created_entry)) {
                    invalidUsersData(response.data.not_created_entry)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                throw error;
            });
    };

    const setReportDate = (date) => {
        setDate(date)
    }

    const invalidUsersData = (users) => {
        setInvalidUsers(users)
    }
    console.log(isValuePresent(invalidUsers))
    return (
        <div className='upload-file-container align-center' >
            <div className='file-type-containe align-center'>
                <Autocomplete
                    className='reporting-type'
                    disablePortal
                    id="combo-box-demo"
                    value={uploadFileType}
                    onChange={selectUploadReportType}
                    options={uploadFileTypes.map(data => data)}
                    blurOnSelect={true}
                    renderInput={(params) => <TextField {...params} label={'Reporting Type'}/>}
                />
            </div>
            {uploadFileType && uploadFileType === 'User Upload' ?
            <div className='upload-btn-container align-center' >
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload Users
                    <VisuallyHiddenInput accept=".csv" onChange={handleFileUpload('users')}  type="file" />
                </Button>
            </div>
                : ''}
            {uploadFileType && uploadFileType === 'Report Upload' ?
                <div className='upload-btn-container align-center' >
                <Button component="label"  variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload APR
                    <VisuallyHiddenInput accept=".csv" onChange={handleFileUpload('apr')}  type="file" />
                </Button>
                    <DatePickerComp reportDate={setReportDate} />
                <div>
                    <Autocomplete
                        className='team-leaders-dropdown'
                        id="combo-box-demo"
                        options={timeList}
                        value={timeList.find(value => value.id === selectedTime) || null}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.time || ""}
                        onChange={selectTime}
                        blurOnSelect={true}
                        renderInput={(params) => <TextField {...params} label={'Report Time'}
                        />}
                    />
                </div>
                </div>
                : ''
            }
            {csvFile &&
                <>
                    <Button onClick={importFile} className='submit-upload '>
                        {uploadFileType === 'User Upload' ? 'Create Users' : 'Upload File'}
                    </Button>
                    {fileType === 'users' || isValuePresent(invalidUsers) ?
                        <div className='upload-csv-view'>
                            <ShowCsvData csvFile={csvFile} invaliUsers={invalidUsers}/>
                        </div> : ''
                    }
                </>
            }
        </div>
    )
}

export default FileUpload