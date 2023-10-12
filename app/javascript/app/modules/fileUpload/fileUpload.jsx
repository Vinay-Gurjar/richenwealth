import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShowCsvData from "../showCsvData/showCsvData";
import './fileUpload.css'
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";
import axios from "axios";
import AutoCompleteDropdown from "../autoCompleteDropdown/autoCompleteDropdown";

const FileUpload = ({}) => {

    const [csvFile, setCsvFile] = useState()
    const [selectedTime, setSelectedTimer] = useState()
    const [uploadFileType, setUploadFileType] = useState('')


    const timesArray = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
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
        setSelectedTimer(value)
    }
    const handleFileUpload = (event) => {
        console.log(event.target.files[0])
        setCsvFile(event.target.files[0])
    }

    const selectUploadReportType = (event, value) => {
        setUploadFileType(value)
    }

    // const handlePostRequest = () => {
    //     debugger
    //     const postData = {
    //         csv_file: csvFile
    //     };
    //
    //     fetch('http://localhost:3000/api/users/import_users', {
    //         method: 'POST',
    //
    //         body: JSON.stringify(postData),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log('POST request successful:', data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // };


    const handlePostRequest = async () => {
        try {
            const formData = new FormData();
            formData.append('csv_file', csvFile);

            const response = await fetch('http://localhost:3000/api/users/import_users', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('CSV file uploaded and processed:', data);
            } else {
                console.error('Failed to upload CSV file.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className='upload-file-container align-center' >
            <div className='file-type-containe align-center'>
                <Autocomplete
                    className='team-leaders-dropdown'
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
                    Upload Team Leaders
                    <VisuallyHiddenInput accept=".csv" onChange={handleFileUpload}  type="file" />
                </Button>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload Agents
                    <VisuallyHiddenInput accept=".csv" onChange={handleFileUpload}  type="file" />
                </Button>
            </div>
                : ''}
            {uploadFileType && uploadFileType === 'Report Upload' ?
                <div className='upload-btn-container align-center' >
                <Button component="label"  variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload APR
                    <VisuallyHiddenInput accept=".csv" onChange={handleFileUpload}  type="file" />
                </Button>
                <div>
                    <Autocomplete
                        className='team-leaders-dropdown'
                        disablePortal
                        id="combo-box-demo"
                        value={selectedTime}
                        onChange={selectTime}
                        options={timesArray.map(data => data)}
                        blurOnSelect={true}
                        renderInput={(params) => <TextField {...params} label={'Report Time'}/>}
                    />
                </div>
                {/*<AutoCompleteDropdown listArray={} onChangeValue={} selectedValue={} />*/}
                </div>
                : ''
            }
            {csvFile &&
                <>
                    <Button onClick={handlePostRequest} className='submit-upload '>
                        { uploadFileType === 'User Upload' ? 'Create Users' : 'Upload File' }
                    </Button>

                    <div className='upload-csv-view'>
                        {/*<ShowCsvData csvFile={csvFile} />*/}
                    </div>
                </>
            }
        </div>
    )
}

export default FileUpload