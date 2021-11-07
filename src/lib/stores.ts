import { writable } from "svelte/store";

export type Member = {
    name: string
}
export type Product = {
    name: string,
    price: number, // in cents
}
export type Item = {
    product: Product,
    amount: number
}

export const currentMember = writable<Member>()
export const members = writable<Member[]>([])
export const products = writable<Product[]>([])
export const order = writable<Item[]>([])