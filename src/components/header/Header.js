import { ExcelComponent } from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  toHTML() {
    return `          <input type="text" value="Новая таблица" class="excel__header-input" />

    <div class="excel__header-btns">
      <div class="excel__header-btn">
        <span class="material-icons"> exit_to_app </span>
      </div>

      <div class="excel__header-btn">
        <span class="material-icons"> delete </span>
      </div>
    </div>`;
  }
}
