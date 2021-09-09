import { DomListener } from '@core/DomListener';

export class ExelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.unsubscribes = [];
		this.prepare();
	}

	// Настраиваем компонент до inint
	prepare() {
	}

	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscribes.push(unsub);
	}

	toHtml() {
		return `Привет мир`;
	}

	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.removeDOMListeners();
		this.unsubscribes.forEach((unsub) => unsub());
	}
}
