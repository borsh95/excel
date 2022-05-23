import { $ } from "../../../../core/dom";

export function resizeHandler($root, ev) {
	const $resizer = $(ev.target);
	const $parent = $resizer.closest('[data-type="resizable"]');
	const coords = $parent.getCoords();
	const type = $resizer.data.resize;
	let delta, value;
	$resizer.css({opacity: 1});

	document.onmousemove = (e) => {
		if (type === "col") {
			delta = e.clientX - coords.right;
			$resizer.css({transform: `translateX(${delta}px)`})
		} else {
			delta = e.clientY - coords.bottom;
			$resizer.css({transform: `translateY(${delta}px)`})
		}
	};

	document.onmouseup = (e) => {
		document.onmousemove = document.onmouseup = null;

		$resizer.css({opacity: "", transform: ""});

		if (type === "col") {
			const cells = $root.findAll(`[data-cell="${$parent.data.col}"]`);
			value = coords.width + delta + "px";

			[...[$parent], ...cells].forEach(item => {
				item.css({
					width: value
				})
			});
		} else {
			value = coords.height + delta + "px";

			$parent.css({
				height: value
			});
		}
	};
}