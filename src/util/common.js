export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

export const isOneDay = (dateA, dateB) => {
  const a = window.moment(dateA);
  const b = window.moment(dateB);
  return a
};


return dueDate < (date && !isOneDay(date, dueDate));

