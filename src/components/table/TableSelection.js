export class TableSelection {
  static activeClass = 'excel__table-cell-selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(TableSelection.activeClass);
  }

  clear() {
    this.group.forEach((cell) => cell.removeClass(TableSelection.activeClass));
    this.group = [];
  }

  get selectedIds() {
    return this.group.map((el) => el.id());
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => {
      $el.addClass(TableSelection.activeClass);
    });
  }

  applyStyle(style) {
    this.group.forEach((el) => {
      el.css(style);
    });
  }
}
