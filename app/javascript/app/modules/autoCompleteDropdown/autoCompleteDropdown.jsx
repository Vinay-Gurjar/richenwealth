import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";

const AutoCompleteDropdown = ({listArray, onChangeValue ,selectedValue}) => {

    const onChange = (event, value) => {
        onChangeValue(value)
    }
    return (
        <div>
            <Autocomplete
                className='team-leaders-dropdown'
                id="combo-box-demo"
                options={listArray}
                value={listArray.find(value => value.id === selectedValue) || null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name || ""}
                onChange={onChange}
                blurOnSelect={true}
                renderInput={(params) => <TextField {...params} label={'Agents name & Email'}
                />}
            />
        </div>
    )
}

export default AutoCompleteDropdown