export const getTodayDate = () => {
    // compute todays date
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
}

export const isValuePresent = (value) => {
    return value !== null && value !== undefined && value !== '' && value.length !== 0;
}
export const getFullDate = (selectedYear, inputDate) => {
    const dayOfMonth = parseInt(inputDate.match(/\d+/)[0], 10); // Extract the day as a number
    const date = new Date(selectedYear, new Date(inputDate + ' 0:00').getMonth(), dayOfMonth + 1);
    return date.toISOString().split('T')[0];
}

export const findValueFromArray = (listArray, findValue) => {
   return  listArray.find(value => value.id === findValue)
}

export const attendancePath = '/'