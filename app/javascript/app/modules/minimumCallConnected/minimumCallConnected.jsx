import React from "react";
import './minimumCallConnected.css'

const MinimumCallConnected = () => {
    const minimumCallsHeader = ['S No','Agent Name','Agent Email','Team Leader','Calls Attempted','Calls Connected','Connectivity']
    const minimumCalls = [
            ['1','Renu Chaursia','renuchaurasia62@gmail.com','Mansi Kushwaha','7','1','0.142857142857143'],
            ['2','Pawan Kumar Majhi','pawankumarkm1998@gmail.com','Abhishek Mishra','41','6','0.146341463414634'],
            ['3','Prince Tiwari','tiwarip@gmail.com','Rajesh Kumar Singh','52','10','0.192307692307692'],
            ['4','Shilpi Singh','shilpi134singh@gmail.com','Astuti Singh','30','6','0.2'],
            ['5','Rohit Yadav','ry62220@gmail.com','Pawan Kumar','34','7','0.205882352941176'],
            ['6','Brijesh Kumar','bk042450@gmail.com','Rajesh Kumar Singh','57','13','0.228070175438596'],
            ['7','Indrajit Singh','indrajit01vns@gmail.com','Shreyash Mishra','60','14','0.233333333333333'],
            ['8','Pooja Kannoujiya','3599752@gmail.com','Kanishka Srivastava','97','23','0.237113402061856'],
            ['9','Nancy Yadav','ynancy328@gmail.com','Rajan Mishra','57','14','0.245614035087719'],
            ['10','Sheela Jaishwal','sheelajaiswal421@gmail.com','Jyoti Mishra','72','18','0.25'],
            ['11','Ishika Singh','ishisinghraj@gmail.com','Astuti Singh','31','8','0.258064516129032'],
            ['12','Prince Pathak','princepathak3420@gmail.com','Pawan Kumar','91','24','0.263736263736264'],
            ['13','Ravindra Kumar','kuravindra214@gmail.com','Anushka','78','21','0.269230769230769'],
            ['14','Shivam Vishwakarma','sv0102x@gmail.com','Abhishek Mishra','48','13','0.270833333333333'],
            ['15','Sakshi Chaurasia','sakshichaurasia420143@gmail.com','Mansi Kushwaha','79','22','0.278481012658228'],
    ]


    return (
        <>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        {minimumCallsHeader &&
                            minimumCallsHeader.map((subHeader, index) => (
                                <th className='agent-min-call-header' key={index}>
                                    {subHeader}
                                </th>
                            ))}
                    </tr>
                    </thead>
                    <tbody>
                    {minimumCalls && minimumCalls.map((tableItem) => (
                    <tr>
                        {tableItem.map((item) => (
                            <td className='agent-min-call-value'>
                                {item}
                            </td>
                        ))}
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MinimumCallConnected;