import {createElement} from "../util/render";


const createFilterElement = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${ isChecked ? `checked` : ``}
        />
        <label for="filter__all" class="filter__label">
          ${name} <span class="filter__${name}-count">${count}</span></label
        >`
  );
};

const getMainFilterTemplate = (filters) => {
  const filterElements = filters
    .map((it, i) => createFilterElement(it, i === 0))
    .join(`\n`);
  return (
    `<section class="main__filter filter container">
        ${filterElements}
      </section>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filers = filters;
    this._element = null;
  }

  getTemplate() {
    return getMainFilterTemplate(this._filers);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
