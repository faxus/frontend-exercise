import { Product } from "product";

export default class Store {
	private getSessionStorage: () => Product[];
	private setSessionStorage: (products: Product[]) => void;

	constructor(name: string) {

		const sessionStorage = window.sessionStorage;
		let currentSelection: Product[];

		this.getSessionStorage = () => {
			return currentSelection || JSON.parse(sessionStorage.getItem(name) || "[]");
		};

		this.setSessionStorage = (products: Product[]) => {
			sessionStorage.setItem(name, JSON.stringify(currentSelection = products));
		};
	}

	load = (callback?: any) => {
		const storedProducts = this.getSessionStorage();

		if (callback) {
			callback(storedProducts);
		}
	}

	insert = (prod: Product, callback?: any) => {
		const storedProducts = this.getSessionStorage();
		storedProducts.push(prod);
		this.setSessionStorage(storedProducts);

		if (callback) {
			callback();
		}
	}

	remove = (prodId: string, callback?: any) => {
		const storedProducts = this.getSessionStorage().filter((prod) => prodId !== prod.id.toString());
		this.setSessionStorage(storedProducts);

		if (callback) {
			callback();
		}
	}
}
