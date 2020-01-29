import AbstractComponent from "../components/abstract-component.js";
import {remove, render} from "../util/render";
import NoTasksComponent from "../components/board-no-task";
import BoardTasksComponent from "../components/board-tasks";
import SortComponent, {SortType} from "../components/sort";
import LoadButtonComponent from "../components/load-button";
import TaskController from "./task-controller";

const TASK_VISIBLE = 8;
const TASK_VISIBLE_BY_BUTTON = 4;

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
    taskController.render(task);

    return taskController;
  });
};


export default class BoardController extends AbstractComponent {
  constructor(container, tasksModel) {
    super();
    this._container = container;
    this._taskModel = tasksModel;
    this._sortedTasks = [];
    this._totalTasksVisible = TASK_VISIBLE;
    this._noTaskComponent = new NoTasksComponent();
    this._boardTasksComponent = new BoardTasksComponent();
    this._showedTaskControllers = [];
    this._siteBoardTaskElement = this._boardTasksComponent.getElement();
    this._sortComponent = new SortComponent();
    this._loadButtonComponent = new LoadButtonComponent();
    this._setLoadMoreButton = this._setLoadMoreButton.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange.bind(this));
    this._taskModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const renderingTasks = this._taskModel.getTasks();
    const isAllCardsArchived = renderingTasks.every((task) => task.isArchive);
    if (isAllCardsArchived) {
      render(this._container.getElement(), this._noTaskComponent);
      return;
    }
    render(this._container.getElement(), this._sortComponent);

    render(this._container.getElement(), this._boardTasksComponent);
    const newTasks = renderTasks(this._siteBoardTaskElement, renderingTasks.slice(0, this._totalTasksVisible), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._setLoadMoreButton();
  }

  _onSortTypeChange(sortType) {
    const renderingTasks = this._taskModel.getTasks();
    switch (sortType) {
      case SortType.DATE_UP:
        this._sortedTasks = renderingTasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        this._sortedTasks = renderingTasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT: this._sortedTasks = renderingTasks.slice();
        break;
    }
    this._siteBoardTaskElement.innerHTML = ``;

    const newTasks = renderTasks(this._siteBoardTaskElement, this._sortedTasks.slice(0, this._totalTasksVisible), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
  }

  _setLoadMoreButton() {
    if (this._totalTasksVisible > this._taskModel.getTasks()) {
      return;
    }
    render(this._container.getElement(), this._loadButtonComponent);

    const OnLoadMoreCards = () => {
      const renderingTasks = this._taskModel.getTasks();

      this._sortedTasks = renderingTasks;
      const prevTaskCount = this._totalTasksVisible;
      this._totalTasksVisible = this._totalTasksVisible + TASK_VISIBLE_BY_BUTTON;
      const newTasks = renderTasks(this._siteBoardTaskElement, this._sortedTasks.slice(prevTaskCount, this._totalTasksVisible), this._onDataChange, this._onViewChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
      if (this._totalTasksVisible >= this._sortedTasks.length) {
        remove(this._loadButtonComponent);
      }
    };
    this._loadButtonComponent.setLoadMoreButtonClickListener(OnLoadMoreCards);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }


  _onDataChange(place, oldData, newData) {
    const isSuccess = this._taskModel.updateTask(oldData.id, newData);

    if (isSuccess) {
      place.render(newData);
    }
  }

  _onFilterChange() {
    this._removeTasks();
    this._renderTasks(this._taskModel.getTasks().slice(0, TASK_VISIBLE));
  }
}
