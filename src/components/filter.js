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


export const getMainFilterTemplate = (filters) => {
  const filterElements = filters
    .map((it, i) => createFilterElement(it, i === 0))
    .join(`\n`);
  return (
    `<section class="main__filter filter container">
        ${filterElements}
      </section>`
  );
};

