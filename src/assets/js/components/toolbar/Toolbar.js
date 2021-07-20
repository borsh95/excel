import {ExelComponent} from "@core/ExelComponent";

export class Toolbar extends ExelComponent {
	static className = "excel__toolbar";
	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click']
		});
	}

	toHTML() {
		return `
			 <button>
        <span class="material-icons">format_align_left</span>
      </button>

      <button>
        <span class="material-icons">format_align_center</span>
      </button>

      <button>
        <span class="material-icons">format_align_right</span>
      </button>

      <button>
        <span class="material-icons">format_bold</span>
      </button>

      <button>
        <span class="material-icons">format_italic</span>
      </button>

      <button>
        <span class="material-icons">format_underlined</span>
      </button>
		`;
	}

	onClick(e) {
		console.log(e.target);
	}
}