import { $ } from '@core/Dom';

export function resizeHandler(e) {

	const resizable = $(e.target);
	const parent = resizable.closest('[data-type="resizable"]');
	const coords = parent.getCoords();
	const index = parent.index();
	const type = resizable.data.resize;
	let value;

	resizable.css({
		opacity: 1,
		//bottom: `-5000px`
	});

	window.onmousemove = function (e) {
		if (type === 'col') {
			const delta = e.pageX - coords.right + 2;
			value = coords.width + delta;
			resizable.css({
				transform: `translateX(${delta}px)`,
			});
		} else if (type === 'row') {
			const delta = e.pageY - coords.bottom + 2;
			resizable.css({
				transform: `translateY(${delta}px)`,
			});
		}
	};

	window.onmouseup = function (e) {
		if (type === 'col') {
			const resiseEls = [...document.querySelectorAll('.row__data')]
				.map((row) => row.children[index]);

			resiseEls.map((item) => {
				item.style.width = `${value}px`;
			});
		} else if (type === 'row') {
			parent.css({
				'height': coords.height + (e.pageY - coords.bottom) + 'px',
			});
		}

		window.onmousemove = window.onmouseup = null;
		resizable.css({
			bottom: '',
			opacity: '',
			transform: '',
		});
	};
}