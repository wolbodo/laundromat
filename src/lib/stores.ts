import { writable, get } from "svelte/store";

export const totalPrice = (order) =>
[...order.values()].reduce((sum, item) => sum + item.amount * item.product.price, 0);

export const formatPrice = (price) => `€ ${(price / 100).toFixed(2)}`;

export type User = {
    name: string
}
export type Product = {
    name: string,
    price: number, // in cents
}
export type ProductSet = {
    name: string,
    items: (ProductSet | Product)[]
}
export type Item = {
    product: Product,
    amount: number
}
export type Order = {
    user: User,
    total: number,
    items: Item[]
}

export const currentUser = writable<User>()
export const members = writable<User[]>([])
export const products = writable<ProductSet[]>([])
export const order = writable<Map<string, Item>>(new Map())
export const calculatorValue = writable<number>(0);
export const history = writable<Order[]>([])


export const addProduct = (product) => {
    const value = get(calculatorValue)
    order.update(order => {
        const item = order.get(product.name);
        if (item) {
            item.amount += value || 1;
        } else {
            order.set(product.name, { amount: value || 1, product })
        }
        return order
    })
    calculatorValue.set(0)
};
export const submitOrder = () => {
    history.update(($history) => {
        const o = get(order);
        return [
            ...$history,
            {
                user: get(currentUser),
                total: totalPrice(o),
                items: [...o.values()]
            }
        ];
    });
    order.set(new Map());
    currentUser.set(null);
};