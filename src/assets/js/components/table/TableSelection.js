export class TableSelection {
	static className = "selected";

	constructor() {
		this.group = [];
		this.current = null;
	}

	select($el) {
		this.clear();
		this.group.push($el);
		$el.addClass(TableSelection.className);
		$el.focus();
		this.current = $el;
	}

	selectGroup($els = []) {
		this.clear();
		this.group = $els;
		this.group.forEach($el => {
			$el.addClass(TableSelection.className);
		})
	}

	clear() {
		this.group.forEach((item) => {
			item.removeClass(TableSelection.className);
		});
		this.group.length = 0;
	}
}


