import register from "./register.js";
import marked from "marked";

/* ==========================================================================
   #widgets.js
   ========================================================================== */

/**
 * This handles the rendering of widgets.
 */

/* render
   ========================================================================== */

export default function render(params) {
	//
	// Include Widget.
	//
	register("flexInclude", (el, value) => {
		let target = document.getElementById(el.getAttribute("flexTarget")) || el;

 		fetch(value)
 			.then((resp) => {
 				return resp.text();
 			})
 			.then((text) => {
 				target.innerHTML = marked(text);
 			});
 	});

	//
	// Redirect Widget.
	//
	register("flexRedirect", (el, value) => {
		location.href = value;
	});

	//
	// Retitle Widget.
	//
	register("flexRetitle", (el, value) => {
		document.title = value;
	});

	//
	// Execute Widget.
	//
	register("flexExecute", (el, value) => {
		let script = document.createElement('script');
		//
		// Defines the script source.
		//
		script.src = value;
		//
		// Insert the script element.
		//
		document.querySelector('head').appendChild(script);
	});

	//
	// Expand Widget.
	//
	register("flexExpand", (el, value) => {
		let markdown = marked(el.innerHTML);

		el.innerHTML = `
			<details>
				<summary>${value}</summary>
				<div>
					${markdown}
				</div>
			</details>
		`;
	});

	//
	// Schedule Before
	//
	register("flexShowBefore", (el, value) => {
		if(new Date(value) > new Date()) {
			el.parentNode.removeChild(el);
		}
	});

	//
	// Schedule Before
	//
	register("flexShowAfter", (el, value) => {
		if(new Date(value) < new Date()) {
			el.parentNode.removeChild(el);
		}
	});
}
