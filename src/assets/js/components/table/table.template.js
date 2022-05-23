const CODES = {
	A: 65,
	Z: 90
}

function createCell(_, i) {
	return `
		<div class="cell" data-cell="${i}" contenteditable></div>
	`;
}

function createCol(el, i) {
	return `
		<div class="column" data-type="resizable" data-col="${i}">
			${el}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createRow(cols, i) {
	return `
		<div class="row" data-type="resizable">
			<div class="row__info">
				${!i ? '' : i}
				${!i ? '' : `<div class="row-resize" data-resize="row"></div>`}
			</div>
			<div class="row__data">
				${cols}
			</div>
		</div>
	`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(createCol)
		.join('');

	const cell = new Array(colsCount)
		.fill("")
		.map(createCell)
		.join('');

	rows.push(createRow(cols));

	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(cell, i + 1));
	}

	return rows.join('');
}