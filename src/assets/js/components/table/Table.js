import { $ } from '@core/Dom';
import { ExelComponent } from '@core/ExelComponent';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';

export class Table extends ExelComponent {
	static className = 'excel__table';

	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['click', 'mousedown']
		});
	}

	toHTML() {
		return createTable();
	}

	onClick(e) {

	}

	onMousedown(e) {
		if (e.target.dataset.resize) {
			resizeHandler(e);
		}
	}
}