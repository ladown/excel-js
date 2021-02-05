import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';
import { toInlineStyles } from '../../core/utiles';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return `
    <div 
    class="excel__table-cell"
    contenteditable
    data-type="cell"
    data-col="${col}"
    data-id="${id}"
    data-value="${data || ''}"
    style="${styles}; width: ${width}"
    >
      ${parse(data) || ''}
    </div>
  `;
  };
}

function toColumn({ col, index, width }) {
  return `
  <div 
  class="excel__table-column" 
  data-type="resizable" 
  data-col="${index}"
  style="width: ${width}"
  >
    ${col}
    <div class="excel__table-column-resize" data-resize='col' ></div>
  </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createRow(index, content, state) {
  const resizer = index ? `<div class="excel__row-resize" data-resize='row'></div>` : '';
  const height = getHeight(state, index);

  return `
  <div 
    class='excel__table-row'
    data-type="resizable"
    data-row="${index}"
    style="height: ${height}"
  >
    <div class='excel__row-info'>
      ${index ? index : ''}
      ${resizer}
    </div>
    <div class='excel__row-data'>
      ${content}
    </div>
  </div>
  `;
}

function getWidth(state, index) {
  return `${state[index] || DEFAULT_WIDTH}`;
}

function getHeight(state, index) {
  return `${state[index] || DEFAULT_HEIGHT}`;
}

function widthFrom(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFrom(state))
    .map(toColumn)
    .join('');

  rows.push(createRow('', cols, {}));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell(state, i)).join('');
    rows.push(createRow(i + 1, cells, state.rowState));
  }

  return rows.join('');
}
