import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
	constructor($root, options) {
		super($root, options.listeners);
	}
	// Возращает шаблон компонента
	toHTML() {
		return `
		
		`;
	}

	init() {
		console.log(this);
	}

	destroy() {

	}
}