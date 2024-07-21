export const getUTCDateString = (date : Date) => {
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'short', timeZone: 'UTC' }); // Get month name
    const year = date.getUTCFullYear();
    const weekday = date.toLocaleString('default', { weekday: 'short', timeZone: 'UTC' }); // Get day name
    return `${weekday} ${month} ${day} ${year}`;
};  

export const getDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD format
};