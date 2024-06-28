import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {toast} from 'react-toastify';
import React from "react";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

export const attendancePath = '/'
export const hourlyReport = '/hourly_report'
export const uploadFiles = '/upload_files'
export const minimumCallConnected = '/minimum_calls_connected'
export const attendanceDashboard = '/attendance_dashboard'

export const isValuePresent = (value) => {
    return (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        value !== false &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && Object.keys(value).length === 0)
    );
};
export const getFullDate = (selectedYear, inputDate) => {
    const dayOfMonth = parseInt(inputDate.match(/\d+/)[0], 10); // Extract the day as a number
    const date = new Date(selectedYear, new Date(inputDate + ' 0:00').getMonth(), dayOfMonth + 1);
    return date.toISOString().split('T')[0];
}

export const findValueFromArray = (listArray, findValue) => {
   return  listArray.find(value => value.id === findValue)
}



export const disabledSaveProgressButton =
    <Tooltip title="In view mode, data saving is not available.">
        <Button>Save Progress
            <FontAwesomeIcon className='save-progress-info' icon={faInfoCircle} style={{color: "#3f96fd"}}/>
        </Button>
    </Tooltip>


export const showSuccessToast = (massage) => {
    const isContainerPresent = document.querySelector('.Toastify__toast--success');
    if (isContainerPresent) {
        isContainerPresent.remove();
    }

    toast.success(massage, {
        position: 'bottom-right',
        autoClose: 3000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

}

export const showErrorToast = (massage) => {
    const isContainerPresent = document.querySelector('.Toastify__toast-theme--light.Toastify__toast--error.Toastify__toast--close-on-click');
console.log(massage)
    if (!isContainerPresent) {
        toast.error(massage, {
            position: 'top-right',
            autoClose: 3000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
}

export const showNotification = () => {
    toast.info('In view mode, data is not saving.', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const logo = () => {
    const logos = [
        '/images/BlueLogo.svg',
        '/images/GreenLogo.svg',
        '/images/SimplyLogo.svg'
    ];
    return logos[getRandomNumber(0, 2)];
};

export const companyName = 'Richen Wealth'
