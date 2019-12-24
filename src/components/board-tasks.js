import {createElement} from "../util/render";

const getBoardTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`);
};

export default class BoardTasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getBoardTasksTemplate();
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
