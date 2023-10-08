import React, {useEffect, useState} from 'react';
import { Toolbar, Select, MenuItem, Icon } from '@material-ui/core';
import './header.css'; // Import your CSS file
import MenuIcon from '../../../../../public/assets/image/menuIcon.svg'
import SaralIcon from '../../../../../public/assets/image/saralLogo.svg'
import {FormControl, InputLabel} from "@mui/material";

const HeaderBar = ({ isSaralUser = '', language = '', languages = '', userName = 'vijay kumar' }) => {
    const [name, setName] =  useState ('')
    return (
        <Toolbar className="header-bg" id="header">
            <div className="left-header-container">
                {/*<MenuIcon className="" />*/}
                {/*<SaralIcon className="saral-icon" />*/}
                <img src={'../../../../../public/assets/image/menuIcon.svg'}/>
                <img src={'../../../../../public/assets/image/saralLogo.svg'}/>
                <span className="navbar-header-title"> भारतीय जनता पार्टी </span>
            </div>

            <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">Shift</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={language}
                        label="Shift"
                        // onChange={changeLang}
                    >
                        <MenuItem value={'en'}>08 AM to 3 PM</MenuItem>
                        <MenuItem value={'hn'}>09 AM to 6 PM</MenuItem>
                        <MenuItem value={'tl'}>3 PM to 9 PM</MenuItem>
                    </Select>
                </FormControl>

            </div>

            <div>
                <div className="language-setting-container mt-3">
                </div>
                <div className="right-header-content">
                    <div className="user-profile-container">
                        <span className="user-name">{userName}</span>
                    </div>

                    {/* Only Screen For Mobile */}
                    <div className="user-profile-container-mobile">{/* Mobile content */}</div>
                </div>
            </div>
        </Toolbar>
    );
};

export default HeaderBar;
