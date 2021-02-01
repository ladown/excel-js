const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, index) {
  return `
  <div class="excel__table-cell" contenteditable></div>
  `;
}

function toColumn(col) {
  return `
  <div class="excel__table-column">
    ${col}
  </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createRow(index, content) {
  return `
  <div class='excel__table-row'>
    <div class='excel__row-info'>${index ? index : ''}</div>
    <div class='excel__row-data'>
      ${content}
    </div>
  </div>
  `;
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
