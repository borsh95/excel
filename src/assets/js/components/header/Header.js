import { ExelComponent } from "@core/ExelComponent";

export class Header extends ExelComponent {
	static className = 'excel__header';
	constructor($root, options) {
		super($root, {
			name: 'Header',
			...options
		});
	}

	toHTML() {
		return `
		<input type="text" class="input" value="Новая таблица" />
		<div>
			<button>
			<span class="material-icons">delete</span>
			</button>
			<button>
			<span class="material-icons">exit_to_app</span>
			</button>
		</div>
	`;
	}
}
