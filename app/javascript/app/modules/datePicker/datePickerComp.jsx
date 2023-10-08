import React, {useEffect} from 'react';
import {useState} from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dateFormat from "dateformat";
import dayjs from "dayjs";
import moment from "moment";
import {getTodayDate} from '../../utils'

const DatePickerComp = ({reportDate}) => {

    const [date, setDate] =useState();
    const handleDateChange=(event)=>{
        setDate(event.$d);
        reportDate(event.$d)
    }

    // const maximumDate = dayjs(getTodayDate(), 'DD-MM-YYYY');
    // const minimumDate = dayjs(minDate, 'DD-MM-YYYY');


    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label={'Date'}
                        onChange={handleDateChange}
                        className='report-date-picker-container'
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
