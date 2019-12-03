import {render} from './util.js';
import {getMenuTemplate} from './components/menu.js';
import {getMainFilterTemplate} from './components/filter.js';
import {getBoardTemplate} from './components/board.js';
import {getCardEditTemplate} from './components/card-edit.js';
import {getCardTemplate} from './components/card.js';
import {getLoadButtonTemplate} from './components/load-button.js';
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/card";

const TASK_TIMES = 30;
const TASK_VISIBLE = 7;
const TASK_VISIBLE_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, getMenuTemplate());
render(siteMainElement, getMainFilterTemplate(generateFilters()));
render(siteMainElement, getBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTaskElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTaskElement, getCardEditTemplate());

const tasks = generateTasks(TASK_TIMES);
let totalTasksVisible = TASK_VISIBLE;
tasks
  .slice(1, totalTasksVisible)
  .forEach((task) => render(siteBoardTaskElement, getCardTemplate(task)));

render(siteBoardElement, getLoadButtonTemplate());

const loadMoreButton = siteMainElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () =>{
  const prevTaskCount = totalTasksVisible;
  totalTasksVisible = totalTasksVisible + TASK_VISIBLE_BY_BUTTON;

  tasks
    .slice(prevTaskCount, totalTasksVisible)
    .forEach((task) => render(siteBoardTaskElement, getCardTemplate(task)));

  if (totalTasksVisible >= tasks.length) {
    loadMoreButton.remove();
  }
});
