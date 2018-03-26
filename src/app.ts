import Controller from "controller";
import Template from "template";
import View from "view";

import "./app.scss";

window.onload = () => {

	// const store = new Store("todos-vanilla-es6");
	const template = new Template();
	const view = new View(template);
	const controller = new Controller(view); // send store to controller

	controller.setView();
};
