import { $ } from '@core/dom';

export class Excel {
	constructor(selector, options) {
		this.$el = typeof selector === 'string' ? $(selector) : $(selector);
		this.components = options.components || [];
	}

	getRoot() {
		const $root = $.create('div', 'excel');

		this.components = this.components.map(function (Component) {
			const $el = $.create('div', Component.className);
			const component = new Component($el);
			$el.html(component.toHTML());

			$root.append($el);

			return component;
		});

		return $root;
	}

	render() {
		this.$el.append(this.getRoot());

		this.components.forEach(function (component) {
			component.init();
		})
	}
}