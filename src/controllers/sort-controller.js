import AbstractComponent from "../components/abstract-component";
import {SortType} from "../components/sort";
import {render} from "../util/render";
import {renderTasks} from "./board-controller";

export default class SortController extends AbstractComponent {
  constructor(container, siteBoardTaskElement, renderingTasks, sortComponent, showedTaskControllers, onDataChange, onViewChange) {
    super();
    this._sortComponent = null;
    this._container = container;
    this._renderingTasks = renderingTasks;
    this._siteBoardTaskElement = siteBoardTaskElement;
    this._showedTaskControllers = showedTaskControllers;
    this._sortComponent = sortComponent;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  render() {
    render(this._container.getElement(), this._sortComponent);
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

    const newTasks = renderTasks(this._siteBoardTaskElement, this._sortedTasks.slice(0, this._totalTasksVisible), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
  }
}
