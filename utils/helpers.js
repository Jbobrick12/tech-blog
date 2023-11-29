module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_time: (date) => {
    // Format time as HH:MM:SS
    return date.toLocaleTimeString();
  },
  format_datetime: (date) => {
    // Format date as MM/DD/YYYY HH:MM:SS
    return `${format_date(date)} ${format_time(date)}`;
  },
};
