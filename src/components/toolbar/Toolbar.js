import { ExcelStateComponent } from '../../core/ExcelStateComponent';

import { createToolbar } from './toolbarTemplate';

import { $ } from '../../core/dom';
import { defaultStyles } from '../../constants';

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  static className = 'excel__toolbar';

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      const key = Object.keys(value)[0];

      this.$emit('toolbar:applyStyle', value);
      this.setState({ [key]: value[key] });
    }
  }
}
