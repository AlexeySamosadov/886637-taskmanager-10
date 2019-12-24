import {createElement} from "../util/render";
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
}
