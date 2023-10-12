import React, { useState,useEffect } from 'react';
import Papa from 'papaparse';
import {isValuePresent} from "../../utils";

const  ShowCsvData = ({csvFile}) => {
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

    const isValidEmail = (email, rowNumber) =>  {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
         if (emailPattern.test(email)) {
             return  email
        }else {
             const count = 1 + invalidEmailCount
             setInvalidEmailCount(count)
             return  email
         }
    }

    return (
        <div>
            { csvData.length > 0 ?
              <>
                  <div>
                      <h3>
                          Total Users : {csvData.length}
                      </h3>
                      <h3>
                         Total Invalid Emails : {invalidEmailCount}
                      </h3>
                  </div>
                  <table style={{textAlign: 'center'}}>
                      <thead>
                      {csvData[0] && (
                          <tr >
                              <th style={{border: '1px dotted black'}}>Sr. No</th>
                              {Object.keys(csvData[0]).map((header) => (
                                  <th style={{border: '1px dotted black'}} key={header}>{header}</th>
                              ))}
                          </tr>
                      )}
                      </thead>
                      <tbody>
                      {csvData.map((row, index) => (
                          <tr key={index}>
                                <td style={{border: '1px dotted black'}}>{index + 1}</td>
                              {Object.values(row).map((cell, Tableindex) => (
                                  <td style={{border: '1px dotted black'}} key={index}>{Tableindex === 2 ? isValidEmail(cell, index+1) : cell}</td>
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
