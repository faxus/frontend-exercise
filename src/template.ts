import { Product } from "model";

export default class Template {
	itemList(items: Product[]): string[] {
		return items.map((item) => {
			return `<div class="${item.selected ? "selected" : ""} product-item">
				<input type="checkbox" name="product" data-id="${item.id}"
					${item.selected ? "checked" : ""} value="${item.id}"/>
				<label for="${item.id}">${item.name}</label>
			</div>`;
		});
	}

	filterResult(items: Product[]): string[] {
		return items.map((item) => `<div>${item.name}</div>`);
	}
}
