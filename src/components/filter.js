import AbstractComponent from "./abstract-component";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};


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
  console.log(`filters`, filters);
  const filterElements = filters
    .map((it) => createFilterElement(it, it.checked))
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

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt)=>{
      console.log(evt.target.id);
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
