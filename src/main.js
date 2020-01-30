import {render} from './util/render';
import MenuComponent from './components/menu.js';
import BoardComponent from './components/board.js';
import TaskModel from './models/tasks';
import {generateTasks} from "./mock/card.js";
import BoardController from './controllers/board-controller.js';
import FilterController from "./controllers/filter-controller";


const TASK_TIMES = 30;


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const menuComponent = new MenuComponent();
menuComponent.getElement().querySelector(`.control__label--new-task`)
  .addEventListener(`click`, ()=>{
    boardController.createTask();
});
render(siteHeaderElement, menuComponent);

const tasks = generateTasks(TASK_TIMES);
const taskModel = new TaskModel();
taskModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, taskModel);
filterController.render();

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent);

const boardController = new BoardController(boardComponent, taskModel);
boardController.render();
