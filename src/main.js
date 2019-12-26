import {render} from './util/render';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/card";
import BoardController from './controllers/board-controller';

const TASK_TIMES = 30;


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuComponent());
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent);

const tasks = generateTasks(TASK_TIMES);

const boardController = new BoardController(boardComponent);
boardController.render(tasks);

