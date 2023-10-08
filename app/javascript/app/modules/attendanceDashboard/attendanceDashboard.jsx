import React, {useEffect, useState} from 'react';
import './attendanceDashboard.css'
const AttendanceDashboard = ({}) => {
    const dashboardHeader = ['Team Leader','Present','Absent','Half Day','OGT','10:00 AM','11:00 AM','12:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','Total Left','Total Join']
    const teamLeaders = [
        ['Abhishek Mishra', '20', '2', '1', '3', '0', '1', '0', '0', '-2/1', '1', '-1', '0', '-1', '-1','2','4'],
        ['Anushka', '18', '3', '4', '3', '1', '0', '0', '0', '0', '1', '-1', '0', '-1', '0','2','4'],
        ['Astuti Singh', '15', '5', '5', '3', '0', '0', '0', '0', '2/-1', '1', '-1', '0', '-1', '0','2','4'],
        ['Jyoti Mishra', '20', '3', '1', '3', '0', '0', '0', '0', '2/-1', '1', '0', '0', '-1', '0','2','4'],
        ['Kanishka Srivastava', '20', '0', '1', '3', '0', '1', '0', '0', '2', '1', '0', '0', '0', '0','2','4'],
        ['Mannu Rai', '17', '2', '1', '3', '1', '0', '0', '0', '1', '1', '0', '0', '0', '0','2','4'],
        ['Mansi Kushwaha', '20', '0', '2', '3', '0', '0', '0', '0', '3', '1', '0', '0', '0', '0','2','4'],
        ['Pawan Kumar', '20', '1', '1', '3', '0', '0', '0', '0', '2', '1', '-1', '0', '0', '0','2','4'],
        ['Rajan Mishra', '16', '0', '3', '3', '0', '0', '0', '0', '-2/1', '1', '-1', '0', '0', '0','2','4'],
        ['Rajesh Kumar Singh', '20', '1', '1', '3', '0', '0', '0', '0', '3', '1', '-1', '0', '0', '0','2','4'],
        ['Shreyash Mishra', '22', '1', '4', '3', '0', '0', '0', '0', '1', '1', '-1', '0', '0', '0','2','4']
    ]

    const backGroundColor = 'background: rgb(240, 217, 10);'

    return (
        <div className='dashboard-main-container'>
            <div className='dash-tab-header'>
                {dashboardHeader.map((header) => (
                    <span className='dash-header-item'>{header}</span>
                ))}
            </div>
            <div className='dash-tab-values'>
                {teamLeaders.map((values) => (
                        <span className='dash-values'>
                        {values.map((valueItem) => (
                           <span className='dash-values-item'>
                               {valueItem}
                           </span>
                        ))}
                        </span>
                ))}
            </div>
        </div>
    )
}

export default AttendanceDashboard