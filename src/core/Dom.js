class Dom {
	constructor(el) {
		this.$el = typeof el === 'string' ? document.querySelector(el)
			: el;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}

		return this.$el.outerHTML.trim();
	}

	clear() {
		this.html('');
		return this;
	}

	append(node) {
		node = node instanceof Dom ? node.$el : node;

		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}

		return this;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	index() {
		const parent = this.$el.parentElement;

		return [...parent.children].indexOf(this.$el);
	}

	get data() {
		return this.$el.dataset;
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	css(styles = {}) {
		Object.assign(this.$el.style, styles);
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = function (tagName, className = '') {
	const el = document.createElement(tagName);

	if (className) el.classList.add(className);

	return $(el);
}