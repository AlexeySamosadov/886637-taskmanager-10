import AbstractComponent from "../components/abstract-component.js";
import CardEditComponent from "../components/card-edit";
import CardComponent from "../components/card";
import {remove, render, replaceComponentElement} from "../util/render";
import NoTasksComponent from "../components/board-no-task";
import BoardTasksComponent from "../components/board-tasks";
import SortComponent from "../components/sort";
import LoadButtonComponent from "../components/load-button";

const TASK_VISIBLE = 8;
const TASK_VISIBLE_BY_BUTTON = 8;

const renderTask = (BoardTaskElement, task) => {
  const cardEditComponent = new CardEditComponent(task);
  const cardComponent = new CardComponent(task);
  const replaceCardEditToCard = () => {
    replaceComponentElement(cardComponent, cardEditComponent);
  };
  const replaceCardToCardEdit = () => {
    replaceComponentElement(cardEditComponent, cardComponent);
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
  cardComponent.getElement();
  cardComponent.setEditButtonClickListener(replaceCardToCardEdit);
  cardComponent.setEditButtonClickListener(addEscListener);

  cardEditComponent.getElement();
  cardEditComponent.setEditFormButtonClickListener(replaceCardEditToCard);

  render(BoardTaskElement, cardComponent);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => renderTask(taskListElement, task));
};


export default class BoardController extends AbstractComponent {
  constructor(container) {
    super();
    this._container = container;

    this._noTaskComponent = new NoTasksComponent();
    this._boardTasksComponent = new BoardTasksComponent();
    this._sortComponent = new SortComponent();
    this._loadButtonComponent = new LoadButtonComponent();
  }

  render(renderingTasks) {
    const container = this._container;
    const isAllCardsArchived = renderingTasks.every((task) => task.isArchive);
    if (isAllCardsArchived) {
      render(container.getElement(), this._noTaskComponent);
    } else {
      const boardTasksComponent = this._boardTasksComponent;
      const siteBoardTaskElement = boardTasksComponent.getElement();

      render(container.getElement(), boardTasksComponent);

      const sortComponent = this._sortComponent;
      render(container.getElement(), sortComponent);


      let totalTasksVisible = TASK_VISIBLE;

      renderTasks(siteBoardTaskElement, renderingTasks.slice(0, totalTasksVisible));

      const loadButtonComponent = this._loadButtonComponent;
      render(container.getElement(), loadButtonComponent);

      const OnLoadMoreCards = () => {
        const prevTaskCount = totalTasksVisible;
        totalTasksVisible = totalTasksVisible + TASK_VISIBLE_BY_BUTTON;
        renderTasks(siteBoardTaskElement, renderingTasks.slice(prevTaskCount, totalTasksVisible));

        if (totalTasksVisible >= renderingTasks.length) {
          remove(loadButtonComponent);
        }
      };
      loadButtonComponent.setLoadMoreButtonClickListener(OnLoadMoreCards);
    }
  }
}
