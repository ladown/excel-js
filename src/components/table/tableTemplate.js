const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row) {
  return function (_, col) {
    return `
    <div 
    class="excel__table-cell"
    contenteditable
    data-type="cell"
    data-col="${col}"
    data-id="${row}:${col}"
    ></div>
  `;
  };
}

function toColumn(col, index) {
  return `
  <div class="excel__table-column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="excel__table-column-resize" data-resize='col' ></div>
  </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createRow(index, content) {
  const resizer = index ? `<div class="excel__row-resize" data-resize='row'></div>` : '';
  return `
  <div class='excel__table-row'  data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell(i)).join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
