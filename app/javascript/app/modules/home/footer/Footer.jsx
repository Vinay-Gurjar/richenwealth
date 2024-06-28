import React from 'react'
import {companyName, logo} from "../../../utils";
import "./Footer.scss"
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



const Footer = ({}) => {

    const topFooterColumn = [
        {
            title:"QUICK LINKS",
            links: ['Download Forms', 'Calculators', 'Useful Links', 'Privacy Policy']
        },
        {
            title:"SERVICES",
            links: ['Mutual Fund', 'Bond', 'Fixed Deposits', 'Life Insurance', 'Health Insurance', 'General Insurance', ]
        },
        {
            title:"GET IN TOUCH",
            links: ['info@richenwealth.com', '+91 9971113901'],
            icon: true
        },
    ]

    return (
        <div className="footer-container">
            <div className="container">
                <div className="footer-top">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="footer-logo">
                                <img className="company-logo-footer" src={logo()} />
                            </div>
                            <p className="para">
                                <b>{companyName}</b> is an online Investment platform where users access to mutual funds from leading fund houses in India.
                            </p>
                        </div>
                        {topFooterColumn.map((column,index) => (
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <h4 key={index} className="foot-title" >{column.title}</h4>
                                {column.links.map((link, Li) => (
                                    <div key={Li} className="column-link-container">
                                        {column.icon &&
                                            <span className="link-icon">
                                                {Li === 0 ?
                                                        <FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff",}} /> :
                                                        <FontAwesomeIcon icon={faPhone} style={{color: "#ffffff",}} />
                                                }
                                            </span>
                                        }
                                        <span className="column-link">
                                            {link}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-middle">
                    <div className="footer-middle-title ">
                        <b>{companyName}</b> is an AMFI Registered Mutual Fund Distributor.
                    </div>
                    <p className="footer-middle-para">
                        Disclaimer: Mutual fund investments are subject to market risks.
                        Please read the scheme information and other related documents carefully before investing.
                        Past performance is not indicative of future returns.
                        Please consider your specific investment requirements before choosing a fund, or designing a portfolio that suits your needs.
                    </p>

                    <p className="footer-middle-para mt-1">
                        <b>{companyName}</b> makes no warranties or representations, express or implied,
                        on products offered through the platform of Simply Nivesh.
                        It accepts no liability for any damages or losses, however, caused, in connection with the use of,
                        or on the reliance of its product or related services.
                        Investments in Securities markets are subject to market risks,
                        read all the related documents carefully before investing.
                    </p>
                    <div className="footer-middle-images">
                        <img className="amfi-logo" src="/images/AMFILogo.jpeg" />

                        <div>
                            <div> AMFI Registered</div>
                            <div> ARN - 249792</div>
                        </div>
                        <img className="mutual-funds" src="/images/mutualfunds.png" />
                    </div>
                </div>
                <hr className="hr" />
                <div className="footer-bottom">
                    <p className="para">&copy; 2024 {companyName} | All right reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer