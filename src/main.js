import {render} from './components/util.js';
import {getMenuTemplate} from './components/menu.js';
import {getMainFilterTemplate} from './components/filter.js';
import {getBoardTemplate} from './components/board.js';
import {getCardEditTemplate} from './components/card-edit.js';
import {getCardBlackTemplate} from './components/card-black.js';
import {getLoadButtonTemplate} from './components/load-button.js';

const TASK_TIMES = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, getMenuTemplate());
render(siteMainElement, getMainFilterTemplate());
render(siteMainElement, getBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTaskElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTaskElement, getCardEditTemplate());
new Array(TASK_TIMES).fill(`5`).forEach(() => render(siteBoardTaskElement, getCardBlackTemplate()));

render(siteBoardElement, getLoadButtonTemplate());
