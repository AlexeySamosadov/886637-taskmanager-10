import AbstractComponent from "./abstract-component";

const getBoardTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};


export default class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return getBoardTemplate();
  }
}
