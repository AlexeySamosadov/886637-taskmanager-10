import moment from 'moment';

const formatTime = (date) => {
  return moment(date).format(`hh:mm A`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const isOverdueDate = (dueDate, date) => {
  return dueDate < date;
};

const isOneDay = (dateA, dateB) => {
  if (dateA) {
    return dateA.getDate() === dateB.getDate();
  } else {
    return false;
  }
};

export {formatTime, formatDate, isOverdueDate, isOneDay};
