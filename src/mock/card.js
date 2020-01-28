import {COLORS} from '../const';

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const Tags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const getRandomNumber = function (minNumber, maxNumber) {
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

const getRandomItem = (array) => {
  const index = getRandomNumber(0, array.length - 1);

  return array[index];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0.7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    'mo': Math.random() > 0.5,
  });
};

const generateTags = (tags) => {
  return tags.filter(() => Math.random() > 0.5);
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    description: getRandomItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomItem(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTasks};

