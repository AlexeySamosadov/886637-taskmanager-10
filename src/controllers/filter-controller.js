import FilterComponent from '../components/filter';
import {render, replaceComponentElement} from "../util/render";
import {FilterType} from "../const";

export default class FilterController {
  constructor(container, taskModel) {
    this._container = container;
    this._taskModel = taskModel;

    this._activeFilterType = FilterType.All;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;
    const allTasks = this._taskModel.getTasksAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        // count: getTasksByFilter(allTasks, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;
    console.log(`filters`, filters);
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replaceComponentElement(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent);
    }
  }

  _onFilterChange(filterType) {
    this._taskModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
