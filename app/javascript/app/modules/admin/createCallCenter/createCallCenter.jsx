import React, {useEffect, useState} from "react";
import './createCallCenter.css'
import TextField from '@mui/material/TextField';
import AutoCompleteDropdown from "../../autoCompleteDropdown/autoCompleteDropdown";

const CreateCallCenter = ({state_id}) => {
    const [shortText, setShortText] = useState();
    const [callCenterShift, setCallCenterShift] = useState([])
    const [ccShiftId, setCcShiftId] = useState([])

    const changeCcShiftId = (event) => {
        setCcShiftId(value.id)
    }

    const handleText =(event)=> {

    }

    return (
        <div className="create-call-center">
            <AutoCompleteDropdown
                listArray={callCenterShift}
                name={'Call Center Shift'}
                onChangeValue={changeCcShiftId}
                selectedValue={ccShiftId}
                compareValue={'name'}
                borderNone={'true'}
                width={'20rem'}
            />
            <TextField
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
        </div>
    )
}

export default CreateCallCenter