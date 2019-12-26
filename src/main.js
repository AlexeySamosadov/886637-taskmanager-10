import {render} from './util/render';
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

render(siteHeaderElement, new MenuComponent());
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent);

const tasks = generateTasks(TASK_TIMES);

const renderTask = (BoardTaskElement, task) => {
  const cardEditComponent = new CardEditComponent(task);
  const cardEditElement = cardEditComponent.getElement();
  const cardComponent = new CardComponent(task);
  const cardElement = cardComponent.getElement();

  const replaceCardEditToCard = () => {
    BoardTaskElement.replaceChild(cardElement, cardEditElement);
  };
  const replaceCardToCardEdit = () => {
    BoardTaskElement.replaceChild(cardEditElement, cardElement);
  };

  const onEscPress = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceCardEditToCard();
      document.removeEventListener(`keydown`, onEscPress);
    }
  };
  const addEscListener = () => {
    document.addEventListener(`keydown`, onEscPress);
  };
  cardComponent.setEditButtonClickListener(replaceCardToCardEdit);
  cardComponent.setEditButtonClickListener(addEscListener);

  cardEditComponent.setEditFormButtonClickListener(replaceCardEditToCard);

  render(BoardTaskElement, cardComponent);
};



const renderBoard = (component, renderingTasks) => {
  const isAllCardsArchived = renderingTasks.every((task) => task.isArchive);
  if (isAllCardsArchived || TASK_TIMES < 1) {
    render(component.getElement(), new NoTasksComponent());
  } else {
    const boardTasksComponent = new BoardTasksComponent();
    const siteBoardTaskElement = boardTasksComponent.getElement();

    render(component.getElement(), boardTasksComponent);

    const sortComponent = new SortComponent();
    render(component.getElement(), sortComponent);


    let totalTasksVisible = TASK_VISIBLE;
    renderingTasks
      .slice(0, totalTasksVisible)
      .forEach((task) => {
        renderTask(siteBoardTaskElement, task);
      });

    const loadButtonComponent = new LoadButtonComponent();
    render(component.getElement(), loadButtonComponent);

    const OnLoadMoreCards = () => {
      const prevTaskCount = totalTasksVisible;
      totalTasksVisible = totalTasksVisible + TASK_VISIBLE_BY_BUTTON;

      renderingTasks
        .slice(prevTaskCount, totalTasksVisible)
        .forEach((task) => renderTask(siteBoardTaskElement, task));

      if (totalTasksVisible >= renderingTasks.length) {
        loadButtonComponent.getElement().remove();
      }
    };

    loadButtonComponent.setLoadMoreButtonClickListener(OnLoadMoreCards);
  }
};

renderBoard(boardComponent, tasks);

