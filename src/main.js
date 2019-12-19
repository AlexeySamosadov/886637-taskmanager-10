import {render, RenderPosition} from './util.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import CardEditComponent from './components/card-edit.js';
import CardComponent from './components/card.js';
import LoadButtonComponent from './components/load-button.js';
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/card";

const TASK_TIMES = 30;
const TASK_VISIBLE = 8;
const TASK_VISIBLE_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuComponent().getElement());
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters).getElement());

const boardComponent = new BoardComponent();
const siteBoardElement = boardComponent.getElement();

render(siteMainElement, siteBoardElement);

const siteBoardTaskElement = siteBoardElement.querySelector(`.board__tasks`);

const tasks = generateTasks(TASK_TIMES);

const renderTask = (task) => {
  const cardEditComponent = new CardEditComponent(task).getElement();
  const cardComponent = new CardComponent(task).getElement();

  const editButton = cardComponent.querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    siteBoardTaskElement.replaceChild(cardEditComponent, cardComponent);

  });

  const editForm = cardEditComponent.querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    siteBoardTaskElement.replaceChild(cardComponent, cardEditComponent);
  });

  render(siteBoardTaskElement, cardComponent);
};

let totalTasksVisible = TASK_VISIBLE;
tasks
  .slice(0, totalTasksVisible)
  .forEach((task) => {
    renderTask(task);
  });

const loadButtonComponent = new LoadButtonComponent().getElement();

render(siteBoardElement, loadButtonComponent);

const loadMoreButton = siteMainElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () =>{
  const prevTaskCount = totalTasksVisible;
  totalTasksVisible = totalTasksVisible + TASK_VISIBLE_BY_BUTTON;

  tasks
    .slice(prevTaskCount, totalTasksVisible)
    .forEach((task) => renderTask(task));

  if (totalTasksVisible >= tasks.length) {
    loadMoreButton.remove();
  }
});
