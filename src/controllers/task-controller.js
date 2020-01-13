import CardEditComponent from "../components/card-edit";
import CardComponent from "../components/card";
import {render, replaceComponentElement} from "../util/render";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(boardTaskElement, onDataChange, onViewChange) {
    this._boardTaskElement = boardTaskElement;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._cardComponent = null;
    this._cardEditComponent = null;

    this._replaceCardToCardEdit = this._replaceCardToCardEdit.bind(this);
    this._replaceCardEditToCard = this._replaceCardEditToCard.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._addEscListener = this._addEscListener.bind(this);
  }

  render(task) {
    const oldCardComponent = this._cardComponent;
    const oldCardEditComponent = this._cardEditComponent;

    this._cardComponent = new CardComponent(task);
    this._cardEditComponent = new CardEditComponent(task);
    const cardEditComponent = this._cardEditComponent;
    const cardComponent = this._cardComponent;

    cardComponent.getElement();
    cardComponent.setEditButtonClickListener(this._replaceCardToCardEdit);
    cardComponent.setEditButtonClickListener(this._addEscListener);

    cardEditComponent.getElement();
    cardEditComponent.setEditFormButtonClickListener(this._replaceCardEditToCard);

    cardComponent.setArchiveButtonClickListener(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    cardComponent.setFavoritesButtonClickListener(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    if (oldCardEditComponent && oldCardComponent) {
      replaceComponentElement(cardComponent, oldCardComponent);
      replaceComponentElement(cardEditComponent, oldCardEditComponent);
    } else {
      render(this._boardTaskElement, cardComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceCardEditToCard();
    }
    document.removeEventListener(`keydown`, this._onEscPress);
  }


  _replaceCardToCardEdit() {
    this._onViewChange();
    replaceComponentElement(this._cardEditComponent, this._cardComponent);
    this._mode = Mode.EDIT;
  }

  _replaceCardEditToCard() {
    this._cardEditComponent.reset();
    replaceComponentElement(this._cardComponent, this._cardEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _addEscListener() {
    document.addEventListener(`keydown`, this._onEscPress);
  }

  _onEscPress(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceCardEditToCard();
    }
  }
}
