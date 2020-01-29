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
  console.log(`dateA`, dateA);
  return dateA.getDate() === dateB.getDate();
};

export {formatTime, formatDate, isOverdueDate, isOneDay};
