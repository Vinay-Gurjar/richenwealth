
export const isValuePresent = (value) => {
    return (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        value !== false &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && Object.keys(value).length === 0)
    );
};
export const getFullDate = (selectedYear, inputDate) => {
    const dayOfMonth = parseInt(inputDate.match(/\d+/)[0], 10); // Extract the day as a number
    const date = new Date(selectedYear, new Date(inputDate + ' 0:00').getMonth(), dayOfMonth + 1);
    return date.toISOString().split('T')[0];
}

export const findValueFromArray = (listArray, findValue) => {
   return  listArray.find(value => value.id === findValue)
}

export const attendancePath = '/'
export const hourlyReport = '/hourly_report'
export const uploadFiles = '/upload_files'
export const minimumCallConnected = '/minimum_calls_connected'
export const attendanceDashboard = '/attendance_dashboard'