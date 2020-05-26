import CardEditComponent from "../components/card-edit";
import CardComponent from "../components/card";
import {render, replaceComponentElement, remove, RenderPosition} from "../util/render";
import {COLOR} from '../const';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: [],
  color: COLOR.BLACK,
  isFavourite: false,
  isArchive: false,
};

export default class TaskController {
  constructor(boardTaskElement, onDataChange, onViewChange) {
    this._boardTaskElement = boardTaskElement;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = null;
    this._cardComponent = null;
    this._cardEditComponent = null;

    this._replaceCardToEdit = this._replaceCardToEdit.bind(this);
    this._replaceEditToCard = this._replaceEditToCard.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._addEscListener = this._addEscListener.bind(this);
  }

  render(task, mode) {
    const oldCardComponent = this._cardComponent;
    const oldCardEditComponent = this._cardEditComponent;
    this._mode = mode;

    this._cardComponent = new CardComponent(task);
    this._cardEditComponent = new CardEditComponent(task);
    const cardEditComponent = this._cardEditComponent;
    const cardComponent = this._cardComponent;

    cardComponent.getElement();
    cardComponent.setEditButtonClickListener(this._replaceCardToEdit);
    cardComponent.setEditButtonClickListener(this._addEscListener);
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

    cardEditComponent.getElement();
    cardEditComponent.setEditFormButtonClickListener((evt)=> {
      evt.preventDefault();
      const data = this._cardEditComponent.getData();
      this._onDataChange(this, task, data); // НАдо вернуть восле


      this._replaceEditToCard();
    });

    cardEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));

    switch (this._mode) {
      case Mode.DEFAULT:
        if (oldCardEditComponent && oldCardComponent) {
          replaceComponentElement(cardComponent, oldCardComponent);
          replaceComponentElement(cardEditComponent, oldCardEditComponent);
        } else {
          render(this._boardTaskElement, cardComponent);
        }
        break;
      case Mode.ADDING:
        if (oldCardEditComponent && oldCardComponent) {
          remove(oldCardComponent);
          remove(oldCardEditComponent);
        }
        this._addEscListener();
        render(this._boardTaskElement, this._cardEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }


  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToCard();
    }
    document.removeEventListener(`keydown`, this._onEscPress);
  }


  _replaceCardToEdit() {
    this._onViewChange();
    replaceComponentElement(this._cardEditComponent, this._cardComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToCard() {
    this._cardEditComponent.reset();
    replaceComponentElement(this._cardComponent, this._cardEditComponent);
    this._mode = Mode.DEFAULT;
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._cardEditComponent);
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  _addEscListener() {
    document.addEventListener(`keydown`, this._onEscPress);
  }

  _onEscPress(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyTask, null);
      }
      this._replaceEditToCard();
    }
  }
}
