import {render} from './util.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import CardEditComponent from './components/card-edit.js';
import CardComponent from './components/card.js';
import LoadButtonComponent from './components/load-button.js';
import BoardTasksComponent from './components/board-tasks.js';
import SortComponent from './components/sort.js';
import NoTasksComponent from './components/board-no-task.js';
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

const tasks = generateTasks(TASK_TIMES);
const isAllCardsArchived = tasks.every((task) => task.isArchive);

if (isAllCardsArchived || TASK_TIMES < 1) {
  render(siteBoardElement, new NoTasksComponent().getElement());
} else {
  const boardTasksComponent = new BoardTasksComponent();
  const siteBoardTaskElement = boardTasksComponent.getElement();

  render(siteBoardElement, siteBoardTaskElement);

  const sortElement = new SortComponent().getElement();
  render(siteBoardElement, sortElement);

  const renderTask = (BoardTaskElement, task) => {
    const cardEditComponent = new CardEditComponent(task).getElement();
    const cardComponent = new CardComponent(task).getElement();

    const replaceCardEditToCard = () => {
      BoardTaskElement.replaceChild(cardComponent, cardEditComponent);
    };
    const replaceCardToCardEdit = () => {
      BoardTaskElement.replaceChild(cardEditComponent, cardComponent);
    };

    const onEscPress = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceCardEditToCard();
        document.removeEventListener(`keydown`, onEscPress);
      }
    };

    const editButton = cardComponent.querySelector(`.card__btn--edit`);
    editButton.addEventListener(`click`, () => {
      replaceCardToCardEdit();
      document.addEventListener(`keydown`, onEscPress);
    });

    const editForm = cardEditComponent.querySelector(`form`);
    editForm.addEventListener(`submit`, replaceCardEditToCard);

    render(BoardTaskElement, cardComponent);
  };

  let totalTasksVisible = TASK_VISIBLE;
  tasks
    .slice(0, totalTasksVisible)
    .forEach((task) => {
      renderTask(siteBoardTaskElement, task);
    });

  const loadButtonComponent = new LoadButtonComponent().getElement();

  render(siteBoardElement, loadButtonComponent);

  const loadMoreButton = siteMainElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, () =>{
    const prevTaskCount = totalTasksVisible;
    totalTasksVisible = totalTasksVisible + TASK_VISIBLE_BY_BUTTON;

    tasks
      .slice(prevTaskCount, totalTasksVisible)
      .forEach((task) => renderTask(siteBoardTaskElement, task));

    if (totalTasksVisible >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}


