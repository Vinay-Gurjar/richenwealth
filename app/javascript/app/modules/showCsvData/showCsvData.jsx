import React, { useState,useEffect } from 'react';
import Papa from 'papaparse';
import {isValuePresent} from "../../utils";

const  ShowCsvData = ({csvFile, invaliUsers}) => {
    const [csvData, setCSVData] = useState([]);
    const [invalidEmailCount, setInvalidEmailCount] = useState(0)
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isValuePresent(csvFile)) {
            handleFileUpload(csvFile)
        }
    }, [csvFile]);

    const handleFileUpload = (file) => {
        Papa.parse(file, {
            complete: (result) => {
                if (result.errors.length > 0) {
                    console.log("CSV parsing errors:", result.errors);
                    setError("CSV parsing error");
                } else {
                    setCSVData(result.data);
                    setError(null);
                }
            },
            header: true, // Set to true if the first row contains headers
        });
    };

    useEffect(() => {
       if (isValuePresent(invaliUsers)) {
           setCSVData(invaliUsers)
       }
    },[invaliUsers])

    const isValidEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (emailPattern.test(email)) {
            return email
        } else {
            const count = 1 + invalidEmailCount
            setInvalidEmailCount(count)
            return email
        }
    }

    return (
        <div>
            { csvData.length > 0 ?
              <>
                  <div>
                      {!invaliUsers &&
                          <h3>
                              Total Users : {csvData.length}
                          </h3>
                      }
                      {invaliUsers &&
                          <h3>
                              Total Invalid Users : {invaliUsers.length}
                          </h3>
                      }
                  </div>
                  <table style={{textAlign: 'center'}}>
                      <thead>
                      {csvData[0] && (
                          <tr >
                              <th style={{border: '1px dotted black', padding: '0.5rem'}}>Sr. No</th>
                              {Object.keys(csvData[0]).map((header) => (
                                  <th style={{border: '1px dotted black', padding: '0.5rem'}} key={header}>{header}</th>
                              ))}
                          </tr>
                      )}
                      </thead>
                      <tbody>
                      {csvData.map((row, index) => (
                          <tr key={index}>
                                <td style={{border: '1px dotted black',padding: '0.5rem'}}>{index + 1}</td>
                              {Object.values(row).map((cell, TableIndex) => (
                                  <td style={{border: '1px dotted black', padding: '0.5rem'}} key={TableIndex}>{ cell}</td>
                              ))}
                          </tr>
                      ))}
                      </tbody>
                  </table>
              </>
                : ''
            }
        </div>
    );
}

export default ShowCsvData;
