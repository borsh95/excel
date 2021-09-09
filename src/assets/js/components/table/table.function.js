import { range } from '@core/utils';

export function isCell(event) {
	return event.target.closest('.cell');
}

export function matrix(target, current) {
	target = target.id(true);
	current = current.id(true);

	const cols = range(current.col, target.col);
	const rows = range(current.row, target.row);

	return cols.reduce((acc, col) => {
		rows.forEach((row) => {
			acc.push(`${row}:${col}`);
		});
		return acc;
	}, []);
}

export function nextSelector(key, { row, col }) {
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			++row;
			break;
		case 'ArrowRight':
			++col;
			break;
		case 'ArrowLeft':
			--col;
			break;
		case 'ArrowUp':
			--row;
			break;
	}

	return `[data-id="${row}:${col}"]`;
}