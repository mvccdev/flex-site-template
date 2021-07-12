import page from "page.js";
import { path_home, path_404 } from "./settings.js";
import path from "path";
import marked from "marked";
import render from "./widgets.js";
import custom from "./custom.js";

/* ==========================================================================
   #routing.js
   ========================================================================== */

/**
 * This handles the registration of routes.
 */

/* Home Page
   ========================================================================== */

page("/", path_home);

/* Flex Page
   ========================================================================== */

page("/:folder/:page(*)", (context) => {
	//
	// Define the filename. Strip the extension.
	//
	//let filename = context.pathname.replace(/\.[^/.]+$/, "");

	let filename = context.params.folder + "/" + context.params.page.replace(/\.[^/.]+$/, "");

	//
	// Exit if it is a bookmark.
	//
	if(filename.includes("#")) {
		//return;
	}

	//
	// Define Template page promise.
	//
	let pageTemplate = fetch("/static/" + context.params.folder + "/template.html")
		.then((resp) => {
			return resp.text();
		});

	//
	// Define Content page promise.
	//
	let pageContent = fetch("/static/" + filename + ".md")
		.then((resp) => {
			return resp.text();
		})
		.then((text) => {
			if(text.includes("</html>")) {
				return "# Page Not Found";
			}

			return text;
		});

	//
	// Define the Full page promise.
	//
	let fullPage = Promise.all([
		pageTemplate,
		pageContent
	]);

	//
	// Execute the Full page promise.
	//
	fullPage.then(([template, content]) => {
		//
		// Write to the DOM.
		//
		document.getElementById("root").innerHTML = template.replace("{content}", marked(content));

		//
		// Execute render().
		//
		render(context.params);
		//
		// Execute custom.
		//
		custom(context.params);
	});
});

/* Initialize
   ========================================================================== */

page();
