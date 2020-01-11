import {formatTime, formatDate} from "../util/time";
import {MONTH_NAMES} from "../const";
import AbstractSmartComponent from "./abstract-smart-component";

const createHashtags = (hashtags) => {
  return Array.from(hashtags)
    .map((hashtag) => {
      return (
        `<span class="card__hashtag-inner">
         <span class="card__hashtag-name">
           #${hashtag};
         </span>
       </span>`
      );
    })
    .join(`\n`);
};

export const getCardTemplate = (task) => {
  const {description, tags, dueDate, color, repeatingDays, isArchive, isFavorite} = task;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const hashtags = createHashtags(tags);
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <p class="card__text">
                    ${description} </br></br>
                    ${isArchive ? `<img src="http://sibirinfo.ru/inform/ava/images.jpg" width="30" height="30">` : ` `}
                    ${isFavorite ? `<img src="https://pp.userapi.com/p-SfbP4fqXN_zwIhMcmZsnEwrLaTK3ew1FqXkQ/1JYvOOD8YvE.jpg?ava=1" width="30" height="30">` : ` `}
                  </p>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <div class="card__date-deadline">
                        <p class="card__input-deadline-wrap">
                          <span class="card__date">${date}</span>
                          <span class="card__time">${time}</span>
                        </p>
                      </div>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${hashtags}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>`
  );
};

export default class Card extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return getCardTemplate(this._task);
  }


  setEditButtonClickListener(handler) {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, handler);
  }

  setArchiveButtonClickListener(handler) {
    this._element.querySelector(`.card__btn--archive`).addEventListener(`click`, handler);
  }

  setFavoritesButtonClickListener(handler) {
    this._element.querySelector(`.card__btn--favorites`).addEventListener(`click`, handler);
  }
}
