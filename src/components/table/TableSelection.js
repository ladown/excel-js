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

  selectGroup($group = []) {
    this.clear();

    this.group = $group;

    this.group.forEach(($el) => {
      $el.addClass(TableSelection.activeClass);
    });
  }
}
