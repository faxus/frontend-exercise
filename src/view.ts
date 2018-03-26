import { Product } from "product";
import Template from "template";

export default class View {
	private template: Template;
	private $productList: Element;
	private $filterResult: Element;

	constructor(template: Template) {
		this.template = template;
		this.$productList = document.querySelector(".products-list") || new Element();
		this.$filterResult = document.querySelector(".filterResult") || new Element();
	}

	showItems = (items: Product[]) => {
		this.$productList.innerHTML = this.template.itemList(items).join("");
	}

	showSelection = (items: Product[]) => {
		this.$filterResult.innerHTML = this.template.filterResult(items).join("");
	}

	bindSubmitSelection = (eventHandler: any) => {
		const btn = document.querySelector("#btnSubmitFilters") as HTMLButtonElement;
		if (!btn) { return; }
		btn.addEventListener("click", eventHandler);
	}

	bindToggleItem = (eventHandler: any) => {
		const inputs = Array.from(this.$productList.querySelectorAll("input[name='product']"));
		inputs.forEach((checkbox: Element) => {
			checkbox.addEventListener("change", eventHandler);
		});
	}

	bindSearchFilter = (eventHandler: any) => {
		const searchElm = document.querySelector("#searchFilter");
		if (!searchElm) { return; }
		searchElm.addEventListener("keyup", eventHandler);
	}

}
