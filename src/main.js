import {render} from './util.js';
import {getMenuTemplate} from './components/menu.js';
import {getMainFilterTemplate} from './components/filter.js';
import {getBoardTemplate} from './components/board.js';
import {getCardEditTemplate} from './components/card-edit.js';
import {getCardTemplate} from './components/card.js';
import {getLoadButtonTemplate} from './components/load-button.js';
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/card";

const TASK_TIMES = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, getMenuTemplate());
render(siteMainElement, getMainFilterTemplate(generateFilters()));
render(siteMainElement, getBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTaskElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTaskElement, getCardEditTemplate());

const tasks = generateTasks(TASK_TIMES);
tasks.forEach((task) => render(siteBoardTaskElement, getCardTemplate(task)));

render(siteBoardElement, getLoadButtonTemplate());
