import {render} from './util/render';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import TaskModel from './models/tasks';
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/card.js";
import BoardController from './controllers/board-controller.js';

const TASK_TIMES = 30;


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuComponent());
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent);

const tasks = generateTasks(TASK_TIMES);
const taskModel = new TaskModel();
taskModel.setTasks(tasks);


const boardController = new BoardController(boardComponent, taskModel);
boardController.render();

