import { ExelComponent } from '@core/ExelComponent';
import { $ } from '@core/Dom.js';

export class Formula extends ExelComponent {
	static className = 'excel__formula';
	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			...options,
		});
	}

	toHTML() {
		return `
			<div class="info">fx</div>
		  <div class="input" contenteditable spellcheck="false"></div>
		`;
	}

	init() {
		super.init();
		const $input = this.$root.find('.input');

		this.$on('table:selecting', function (data) {
			$input.text(data.text());
		});

		this.$on('table:input', function (data) {
			$input.text(data);
		});
	}

	onInput(e) {
		this.$emit('formula:input', $(e.target).text());
	}

	onKeydown(e) {
		const keys = ['Enter', 'Tab'];
		const { key } = e;
		if (keys.includes(key)) {
			e.preventDefault();
			this.$emit('formula:paragph');
		}
	}
}