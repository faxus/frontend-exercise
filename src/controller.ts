import { Product } from "model";
import Store from "store";
import View from "view";

import "../assets/items.json";

export default class Controller {
	private store: Store;
	private view: View;
	private productsList: Product[];
	private filteredList: Product[];

	constructor(store: Store, view: View) {
		this.store = store;
		this.view = view;
		this.productsList = [];
		this.filteredList = [];
		this.view.bindSubmitSelection(this.submitSelections.bind(this));
		this.view.bindSearchFilter(this.filterProducts.bind(this));
	}

	initList = (): any => {
		this.getProductList()
			.then((data: Product[]) => {
				this.productsList = data;
				this.store.load((storedData: Product[]) => {
					this.loadSelection(storedData);
					this.updateList();
				});
			});
	}

	loadSelection = (storedList: Product[]) => {
		this.productsList.forEach((pr) => {
			storedList.forEach((st) => {
				if (st.id === pr.id) {
					pr.selected = st.selected;
				}
			});
		});

	}

	updateList = (items: Product[] = this.productsList) => {
		this.view.showItems(this.sortProducts(items));
		this.view.bindToggleItem(this.toggleSelecion.bind(this));
	}

	toggleSelecion = (event: Event): any => {
		const input = event.target as HTMLInputElement;
		const prodId = input.dataset.id;
		const prod = this.productsList.find((p) => prodId === p.id.toString());

		if (!prod || !prodId) { return; }
		prod.selected = input.checked;

		if (input.checked) {
			this.store.insert(prod, this.updateList);
		} else {
			this.store.remove(prodId, this.updateList);
		}

	}

	sortProducts = (items: Product[] = this.productsList): any => {
		return items.sort((a, b) => a.selected ? -1 : b.selected ? 1 : 0);
	}

	submitSelections = (): any => {
		const selection = this.productsList.filter((item) => item.selected);
		this.view.showSelection(selection);
	}

	filterProducts = (event: Event): any => {
		setTimeout(() => {
			const input = event.target as HTMLInputElement;
			const text = input.value.toLowerCase() || "";
			if (!text || text === "") {
				this.updateList();
			}
			this.filteredList = this.productsList.filter((item) =>
				item.selected || item.name.toLowerCase().includes(text));
			this.updateList(this.filteredList);
		}, 500);
	}

	getProductList = (): any => {
		// TODO: create a server and get data from API
		return fetch("../assets/items.json")
			.then((res: Response) => {
				return res.json();
			})
			.then((response: any) => {
				return response.data.map((row: string, index: string) => {
					return {
						id: index,
						name: row.trim(),
						selected: false
					};
				});
			})
			.catch((err: any) => {
				console.error(err);
			});
	}

}
