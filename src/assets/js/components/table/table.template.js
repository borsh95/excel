const CODES = {
	A: 65,
	Z: 90
}

function createCell() {
	return `
		<div class="cell" contenteditable></div>
	`;
}

function createCol(content) {
	return `
		<div class="column" data-type="resizable">
			${content}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createRow(content, index) {
	const resizer = (index !== undefined) ? `<div class="row-resize" data-resize="row"></div>` : '';
	return `
		<div class="row" data-type="resizable">
			<div class="row__info">
				${index !== undefined ? ++index : ''}
				${resizer}
			</div>
			<div class="row__data">${content}</div>
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

	rows.push(createRow(cols));

	for (let i = 0; i < colsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell)
			.join('');

		rows.push(createRow(cells, i));
	}

	return rows.join('');
}


