import { ExcelComponent } from "../../../../core/ExcelComponent";

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'click'],
		});
	}

	init() {
		this.initDOMListeners();
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>
		`;
	}

	onInput(event) {
		console.log(this.$root);
	}

	onClick() {

	}
}