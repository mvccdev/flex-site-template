/* ==========================================================================
   #custom.js
   ========================================================================== */

/**
 * This handles the registration of custom code and widgets.
 */

/* register
   ========================================================================== */

export default function custom(params) {
	//
	// Force the page to scroll to the top when a link is clicked. This was
	// placed in custom.js and not routing.js, because it based on the site's
	// needs. Also, ensure we are not scrolling if there is a bookmark in the
	// URL.
	//
	if(location.href.indexOf("#") == -1) {
		window.scrollTo(0, 0);
	}
}
