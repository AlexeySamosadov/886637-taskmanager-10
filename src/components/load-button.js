import AbstractComponent from "./abstract-component";

const getLoadButtonTemplate = () => {
  return (`<button class="load-more" type="button">load more</button>`);
};

export default class LoadButton extends AbstractComponent {
  getTemplate() {
    return getLoadButtonTemplate();
  }

  setLoadMoreButtonClickListener(handler) {
    this._element.addEventListener(`click`, handler);
  }
}
