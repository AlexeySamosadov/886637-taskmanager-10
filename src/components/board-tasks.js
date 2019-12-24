import AbstractComponent from "./abstract-component";

const getBoardTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`);
};

export default class BoardTasks extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getBoardTasksTemplate();
  }
}
