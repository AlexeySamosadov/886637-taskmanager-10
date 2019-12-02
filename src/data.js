const randomNumber = function (minNumber, maxNumber) {
  if (arguments.length > 2) {
    return 0;
  } else if (arguments.length === 2) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  } else if (arguments.length === 1) {
    return Math.round(Math.random() * minNumber);
  } else {
    return Math.round(Math.random());
  }
};

const  TASKS = ['Изучить теорию', 'Сделать домашку', 'Пройти интенсив на соточку'];

const generateTask = () => (TASKS[randomNumber(0, 2)]);

export const tasksData = {
  description: generateTask(),
  dueDate:
};
