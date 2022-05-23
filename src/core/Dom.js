class Dom {
	constructor(selector) {
		this.$el = typeof selector === "string"
			? document.querySelector(selector)
			: selector;
	}

	findAll(selector) {
		return [...this.$el.querySelectorAll(selector)].map(item => $(item));
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	css(styles = {}) {
		Object.assign(this.$el.style, styles);

		return this.$el;
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	get data() {
		return this.$el.dataset;
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	append(node) {
		if (node instanceof Dom) {
			this.$el.append(node.$el);
		} else {
			if (Element.prototype.append) {
				this.$el.append(node);
			} else {
				this.$el.appendChild(node);
			}
		}

		return this;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}

		return this.$el.outerHTML.trim();
	}

	clear() {
		this.$el.innerHTML = '';
		return this;
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.className = classes;
	}
	return $(el);
}