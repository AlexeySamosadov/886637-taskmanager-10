import {COLORS, DAYS, MONTH_NAMES} from '../const';
import {formatTime, createElement} from "../util";

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

const getCardEditTemplate = (task) => {
  const {description, tags, dueDate, color, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const hashtags = createHashtags(tags);
  const repeatingDaysMarkup = createRepeatingDays(DAYS, repeatingDays);
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
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`
  );
};

export default class CardEdit {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return getCardEditTemplate(this._task);
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
