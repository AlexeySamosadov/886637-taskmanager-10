import AbstractComponent from "./abstract-component";


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

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filers = filters;
  }

  getTemplate() {
    return getMainFilterTemplate(this._filers);
  }
}
