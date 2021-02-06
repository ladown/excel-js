import { ExcelComponent } from '../../core/ExcelComponent';

import * as actions from '../../redux/actions';

import { $ } from '../../core/dom';
import { parse } from '../../core/parse';

import { defaultStyles } from '../../constants';

import { TableSelection } from './TableSelection';
import { isCell, matrix, nextSelector, shouldResize } from './tableFunctions';
import { createTable } from './tableTemplate';
import { resizeHandler } from './tableResize';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (value) => {
      this.selection.current.attr('data-value', value).text(parse(value));
      this.selection.current.text(value);
      this.updateTextInStore(value);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        }),
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);

    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn('Resizer error', error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`),
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));

      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      }),
    );
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
