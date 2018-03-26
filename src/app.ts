import Controller from "controller";
import Store from "store";
import Template from "template";
import View from "view";

import "./app.scss";

window.onload = () => {

	const store = new Store("selected-products");
	const template = new Template();
	const view = new View(template);
	const controller = new Controller(store, view);

	controller.initList();
};
