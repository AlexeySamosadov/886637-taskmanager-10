import AbstractComponent from "./abstract-component";
import SortComponent, {SortType} from  './sort';


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

  setLoadMoreButtonClickListener(handler) {
    this._element.addEventListener(`click`, handler);
  }
}
