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

	text(text) {
		if (typeof text === 'string') {
			this.$el.textContent = text;
			return this;
		}

		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim();
		}

		return this.$el.textContent.trim();
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

	get hasElement() {
		return !!this.$el;
	}

	focus() {
		this.$el.focus();
	}

	id(parse) {
		if (parse) {
			const parsed = this.id().split(':');

			return {
				row: +parsed[0],
				col: +parsed[1]
			};
		}
		return this.data.id;
	}

	find(selector) {
		return $(this.$el.querySelector(selector));
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

	addClass(string) {
		this.$el.classList.add(string);
	}

	removeClass(string) {
		this.$el.classList.remove(string);
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