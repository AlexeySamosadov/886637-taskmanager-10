import AbstractComponent from "./abstract-component";

const getBoardTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`);
};

export default class BoardTasks extends AbstractComponent {
  getTemplate() {
    return getBoardTasksTemplate();
  }

  setEscListener(handler) {
    document.addEventListener(`keydown`, handler);
  }
}
