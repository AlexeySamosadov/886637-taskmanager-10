import AbstractComponent from "../components/abstract-component.js";
import {remove, render} from "../util/render";
import NoTasksComponent from "../components/board-no-task";
import BoardTasksComponent from "../components/board-tasks";
import SortComponent, {SortType} from "../components/sort";
import LoadButtonComponent from "../components/load-button";
import TaskController from "./task-controller";

const TASK_VISIBLE = 8;
const TASK_VISIBLE_BY_BUTTON = 4;

const renderTasks = (taskListElement, tasks, onDataChange) => {
  tasks.forEach((task) => {
    const taskController = new TaskController(taskListElement, onDataChange);
    taskController.render(task);
  });
};


export default class BoardController extends AbstractComponent {
  constructor(container) {
    super();
    this._container = container;
    this._renderingTasks = [];
    this._sortedTasks = [];
    this._totalTasksVisible = TASK_VISIBLE;

    this._noTaskComponent = new NoTasksComponent();
    this._boardTasksComponent = new BoardTasksComponent();
    this._siteBoardTaskElement = this._boardTasksComponent.getElement();
    this._sortComponent = new SortComponent();
    this._loadButtonComponent = new LoadButtonComponent();
    this._setLoadMoreButton = this._setLoadMoreButton.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(renderingTasks) {
    this._renderingTasks = renderingTasks;
    const isAllCardsArchived = renderingTasks.every((task) => task.isArchive);
    if (isAllCardsArchived) {
      render(this._container.getElement(), this._noTaskComponent);
      return;
    }
    const sortComponent = this._sortComponent;
    render(this._container.getElement(), sortComponent);

    render(this._container.getElement(), this._boardTasksComponent);
    renderTasks(this._siteBoardTaskElement, this._renderingTasks.slice(0, this._totalTasksVisible), this._onDataChange);

    this._setLoadMoreButton();
    sortComponent.setSortTypeChangeHandler(this._onSortTypeChange.bind(this));
  }

  _onSortTypeChange(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._sortedTasks = this._renderingTasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        this._sortedTasks = this._renderingTasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT: this._sortedTasks = this._renderingTasks.slice();
        break;
    }
    this._siteBoardTaskElement.innerHTML = ``;
    renderTasks(this._siteBoardTaskElement, this._sortedTasks.slice(0, this._totalTasksVisible), this._onDataChange);
  }

  _setLoadMoreButton() {
    if (this._totalTasksVisible > this._renderingTasks) {
      return;
    }
    render(this._container.getElement(), this._loadButtonComponent);

    const OnLoadMoreCards = () => {
      this._sortedTasks = this._renderingTasks;
      const prevTaskCount = this._totalTasksVisible;
      this._totalTasksVisible = this._totalTasksVisible + TASK_VISIBLE_BY_BUTTON;
      renderTasks(this._siteBoardTaskElement, this._sortedTasks.slice(prevTaskCount, this._totalTasksVisible), this._onDataChange);

      if (this._totalTasksVisible >= this._sortedTasks.length) {
        remove(this._loadButtonComponent);
      }
    };
    this._loadButtonComponent.setLoadMoreButtonClickListener(OnLoadMoreCards);
  }

  _onDataChange(place, oldData, newData) {
    const index = this._renderingTasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._renderingTasks = [].concat(this._renderingTasks.slice(0, index), newData, this._renderingTasks.slice(index + 1));
    place.render(this._renderingTasks[index]);
  }
}
