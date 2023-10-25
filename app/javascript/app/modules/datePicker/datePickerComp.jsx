import React, {useEffect} from 'react';
import {useState} from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './datePickerComp.css'
const DatePickerComp = ({reportDate, borderNone}) => {

    const [date, setDate] =useState();
    const handleDateChange=(event)=>{
        setDate(event.$d);
        reportDate(event.$d)
    }


    return (
        <div style={{width: '15rem'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label={'Date'}
                        onChange={handleDateChange}
                        className={`report-date-picker-container-${borderNone}`}
                        value={date}
                        slotProps={{
                            textField: {
                                readOnly: true,
                            },
                        }}
                        format="DD/MM/YYYY"
                        // maxDate={maxDate}
                    />
                </DemoContainer>

            </LocalizationProvider>
        </div>
    );
};

export default DatePickerComp;
