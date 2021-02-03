import { ExcelComponent } from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }
  static className = 'excel__toolbar';
  toHTML() {
    return `          <div class="excel__toolbar-btns">
    <div class="excel__toolbar-btn">
      <span class="material-icons"> format_align_left </span>
    </div>
    <div class="excel__toolbar-btn">
      <span class="material-icons"> format_align_center </span>
    </div>
    <div class="excel__toolbar-btn">
      <span class="material-icons"> format_align_right </span>
    </div>
    <div class="excel__toolbar-btn">
      <span class="material-icons"> format_bold </span>
    </div>
    <div class="excel__toolbar-btn">
      <span class="material-icons"> format_italic </span>
    </div>
    <div class="excel__toolbar-btn">
      <span class="material-icons"> format_underlined </span>
    </div>
  </div>`;
  }

  onClick(event) {
    console.log(event.target.textContent.trim());
  }
}
