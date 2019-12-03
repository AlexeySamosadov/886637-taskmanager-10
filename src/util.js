const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = setTimeFormat(date.getHours() % 12);
  const minutes = setTimeFormat(date.getMinutes());

  const partOfDay = date.getHours() < 11 ? `am` : `pm`;

  return `${hours}:${minutes}:${partOfDay}`;
};

export const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};
