import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './tableTemplate';

import { resizeHandler } from './tableResize';
import { shouldResize } from './tableFunctions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(20);
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
