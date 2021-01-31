import { ExcelComponent } from '../../core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  toHTML() {
    return `          <div class="excel__table-row">
    <div class="excel__row-info"></div>
    <div class="excel__row-data">
      <div class="excel__table-column">A</div>
      <div class="excel__table-column">B</div>
      <div class="excel__table-column">C</div>
    </div>
  </div>
  <div class="excel__table-row">
    <div class="excel__row-info">1</div>
    <div class="excel__row-data">
      <div class="excel__table-cell excel__table-cell-selected">a1</div>
      <div class="excel__table-cell">b1</div>
      <div class="excel__table-cell">c1</div>
    </div>
  </div>`;
  }
}
