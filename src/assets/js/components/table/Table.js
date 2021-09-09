
import { $ } from '@core/Dom';
import { ExelComponent } from '@core/ExelComponent';
import { Emmiter } from '../../../../core/Emitter';
import { isCell, matrix, nextSelector } from './table.function';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		});

		this.unsubs = [];
	}

	toHTML() {
		return createTable();
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();
		const $cell = this.$root.find('[data-id="0:0"]');
		this.selectCell($cell);
		this.$on('formula:input', (data) => {
			this.selection.current.html(data);
		});

		this.$on('formula:paragph', () => {
			this.selection.current.focus();
		});
	}

	onMousedown(e) {
		if (e.target.dataset.resize) {
			resizeHandler(e);
		} else if (isCell(e)) {
			const $target = $(e.target);
			if (e.shiftKey) {
				const target = $target.id(true);
				const current = this.selection.current.id(true);

				const $sells = matrix($target, this.selection.current).map(id => {
					return this.$root.find(`[data-id="${id}"]`);
				});
				this.selection.selectGroup($sells);
			} else {
				this.selection.select($(e.target));
			}
		}
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:selecting', $cell);
	}

	onKeydown(e) {
		const keys = ['Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowDown',
			'ArrowUp'
		];
		const { key } = e;

		if (keys.indexOf(key) !== -1 && !e.shiftKey) {
			e.preventDefault();
			const ids = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, ids));
			if ($next.hasElement) this.selectCell($next);
		}
	}

	onInput(e) {
		this.$emit('table:input', this.selection.current.text());
	}
}
