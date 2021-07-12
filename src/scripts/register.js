/* ==========================================================================
   #register.js
   ========================================================================== */

/**
 * This handles the registration of widgets.
 */

/* register
   ========================================================================== */

export default function register(directive, fn) {
	//
	// Select all instances.
	//
	let els = document.querySelectorAll('[' + directive + ']');
	//
	// Callback for each one.
	//
	Array.prototype.forEach.call(els, (el, index) => {
		fn(el, el.getAttribute(directive));
	});
}
