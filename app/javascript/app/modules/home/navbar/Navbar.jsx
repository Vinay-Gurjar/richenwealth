import React, {useEffect, useState} from "react"
import "./Navbar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {logo} from "../../../utils";
import Button from "@mui/material/Button";

const Navbar = ({}) => {
    const Buttons = ['Home', 'About Us', 'Services ', 'Blog', 'Contact Us']

    return (
        <div className="navbar-container">
            <div className="info-container">
                <div className="container d-flex">
                    <div className="contact-details ">
                        <div className="number">
                            <FontAwesomeIcon icon={faPhone} style={{color: "#ffffff",}} /> +91 9971113901
                        </div>
                        <div className="email">
                            <FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff",}} /> info@richenwealth.com
                        </div>
                    </div>

                    <div className="social-media">
                        <div className="insta-icon">
                            <FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff",}} />
                        </div>
                        <div className="insta-facebook">
                            <FontAwesomeIcon icon={faFacebook} style={{color: "#ffffff",}} />
                        </div>
                        <div className="insta-linkdin">
                            <FontAwesomeIcon icon={faLinkedinIn} style={{color: "#ffffff",}} />
                        </div>
                        <div className="insta-twitter">
                            <FontAwesomeIcon icon={faTwitter} style={{color: "#ffffff",}} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="nav-buttons">
                <div className="container d-flex">
                    <div className="logo-container">
                        <img className="company-logo" src={logo()} />
                    </div>

                    <div className="d-flex button-container p-3">
                        {Buttons.map((button, index) => (
                            <Button key={index} className="navigation-button">
                                {button}
                            </Button>
                        ))}
                    </div>
                    <div className="login-container">
                        <Button  className="login-button">Login Portfolio</Button>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Navbar