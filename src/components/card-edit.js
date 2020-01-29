import {COLORS, DAYS} from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {formatTime, formatDate} from "../util/time";
import AbstractSmartComponent from "./abstract-smart-component";
import {isOverdueDate, isRepeating} from "../util/common";

const createColorsMarkup = (colors, currentColor) => {
  return colors
    .map((color) => {
      return (
        `<input
          type="radio"
          id="color-${color}-4"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value=${color}
          ${color === currentColor ? `checked` : ``}
        />
        <label
         for="color-${color}-4"
         class="card__color card__color--${color}"
        >black</label>`
      );
    })
    .join(`\n`);
};


const createRepeatingDays = (days, repeatingDays) => {
  return days
    .map((day)=> {
      const isChecked = repeatingDays[day];
      return (
        `<input
         class="visually-hidden card__repeat-day-input"
         type="checkbox"
         id="repeat-${day}-4"
         name="repeat"
         value=${day}
         ${isChecked ? `checked` : ``}
         />
         <label class="card__repeat-day" for="repeat-${day}-4"
         >${day}</label>`
      );
    })
    .join(`\n`);

};

const createDateShowingTemplate = (isDateShowing, date, time) => {
  return isDateShowing ?
    `<fieldset class="card__date-deadline">
       <label class="card__input-deadline-wrap">
       <input
        class="card__date"
        type="text"
        placeholder=""
        name="date"
        value="${date} ${time}"
       />
       </label>
       </fieldset>` : ``;
};

const createHashtags = (hashtags) => {
  return [...hashtags]
    .map((hashtag) => {
      return (`
         <span class="card__hashtag-inner">
            <input
               type="hidden"
               name="hashtag"
               value=${hashtag}
               class="card__hashtag-hidden-input"
            />
            <p class="card__hashtag-name">
              #${hashtag}
            </p>
            <button type="button" class="card__hashtag-delete">
               delete
            </button>
         </span>`
      );
    })
    .join(`\n`);
};

const getCardEditTemplate = (task, options = {}) => {
  const {description, tags, dueDate, color} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays} = options;

  const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, new Date());
  const isBlockSaveButton = ((isDateShowing || !isRepeating(activeRepeatingDays)) && (isRepeatingTask));
  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const hashtags = createHashtags(tags);
  const repeatingDaysMarkup = createRepeatingDays(DAYS, activeRepeatingDays);
  const dateShowingMarkup = createDateShowingTemplate(isDateShowing, date, time);
  const colorsMarkup = createColorsMarkup(COLORS, color);

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${description}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                      </button>
                        ${dateShowingMarkup}
                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                      </button>

                      ${isRepeatingTask ?
      `<fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          ${repeatingDaysMarkup}
                        </div>
                      </fieldset>` : ``}

                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                         ${hashtags}
                      </div>

                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${colorsMarkup}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`
  );
};

export default class CardEdit extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;
    this.resetConstructorDate();
    this._flatpickr = null;
    this._submitHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return getCardEditTemplate(this._task, {
      isDateShowing: this.isDateShowing,
      isRepeatingTask: this.isRepeatingTask,
      activeRepeatingDays: this.activeRepeatingDays,
    });
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  recoverListeners() {
    this._subscribeOnEvents();
    this.setSubmitHandler(this._submitHandler);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  reset() {
    this.resetConstructorDate();
    this.rerender();
  }

  resetConstructorDate() {
    this.isDateShowing = !!this._task.dueDate;
    this.isRepeatingTask = Object.values(this._task.repeatingDays).some(Boolean);
    this.activeRepeatingDays = Object.assign({}, this._task.repeatingDays);
  }

  setEditFormButtonClickListener(handler) {
    this._element.addEventListener(`submit`, handler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, ()=>{
      this.isDateShowing = !this.isDateShowing;
      this.rerender();
    });

    element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, ()=>{
      this.isRepeatingTask = !this.isRepeatingTask;

      this.rerender();
    });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this.activeRepeatingDays[evt.target.value] = evt.target.checked;
        this.rerender();
      });
    }
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      // При своем создании `flatpickr` дополнительно создает вспомогательные DOM-элементы.
      // Что бы их удалять, нужно вызывать метод `destroy` у созданного инстанса `flatpickr`.
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this.isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._task.dueDate,
      });
    }
  }
}
