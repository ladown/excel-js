import { ExcelComponent } from '../../core/ExcelComponent';

import { changeTitle } from '../../redux/actions';

import { defaultTitle } from '../../constants';

import { ActiveRoute } from '../../core/router/ActiveRoute';

import { $ } from '../../core/dom';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input type="text" value="${title}" class="excel__header-input" />
    <div class="excel__header-btns">
      <div class="excel__header-btn" data-button="remove">
        <span class="material-icons" data-button="remove"> delete </span>
      </div>
      <div class="excel__header-btn" data-button="exit">
        <span class="material-icons" data-button="exit"> exit_to_app </span>
      </div>
    </div>`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить Вашу таблицу?');

      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
