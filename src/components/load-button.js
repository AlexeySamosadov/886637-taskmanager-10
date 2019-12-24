import AbstractComponent from "./abstract-component";

const getLoadButtonTemplate = () => {
  return (`<button class="load-more" type="button">load more</button>`);
};

export default class LoadButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getLoadButtonTemplate();
  }

  setLoadMoreButtonClickListener(renderMore) {
    this._element.addEventListener(`click`, renderMore);
  }
}
