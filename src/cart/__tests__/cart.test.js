import {describe, it, expect} from "vitest";
import createCart from "../cart.js";

const Item1 = {
    id: 1,
    name: "test",
    price: 50,
    quality: 1,
    img: "https://www.freepik.com/free-photos-vectors/happy-cat"
}

const Item2 = {
    id: 2,
    name: "second Item",
    price: 21,
    quality: 1,
    img: "https://www.freepik.com/free-photos-vectors/happy-cat"
}

describe("cart functional", () => {
    it("add first item to cart", () => {
        const cart = createCart();
        cart.addItem(Item1);
        expect(cart.items[0].name).toBe("test")
    });

    it("remove item from cart", () => {
        const cart = createCart();
        cart.addItem(Item1);
        expect(cart.items[0].name).toBe("test");
        cart.removeItem(Item1.id);
        expect(cart.items.length).toBe(0)
    });

    it("add multiple items to cart", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item2);
        expect(cart.items.length).toBe(2);
        expect(cart.items[0].id).toBe(1);
        expect(cart.items[1].id).toBe(2);
    });

    it("remove one item from multiple items", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item2);
        cart.removeItem(Item1.id);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].id).toBe(2);
    });

    it("remove non-existent item does nothing", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.removeItem(999);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].id).toBe(1);
    });

    it("add same item twice and it add quality", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item1);
        expect(cart.items.length).toBe(1);
        expect(cart.items[0].quality).toBe(2);
    });

    it("when increment to quality add 1", () => {
        const cart = createCart();
        cart.addItem(Item1);
        expect(cart.items[0].quality).toBe(1);
        cart.increment(cart.items[0].id);
        expect(cart.items[0].quality).toBe(2);
    });

    it("increment quality multiple times", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.increment(cart.items[0].id);
        cart.increment(cart.items[0].id);
        cart.increment(cart.items[0].id);
        expect(cart.items[0].quality).toBe(4);
    });

    it("when decrement to quality subtract 1", () => {
        const cart = createCart();
        cart.addItem(Item1);
        expect(cart.items[0].quality).toBe(1);
        cart.increment(cart.items[0].id);
        expect(cart.items[0].quality).toBe(2);
        cart.decrement(cart.items[0].id);
        expect(cart.items[0].quality).toBe(1);
    });

    it("decrement quality multiple times", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.increment(cart.items[0].id);
        cart.increment(cart.items[0].id);
        cart.decrement(cart.items[0].id);
        cart.decrement(cart.items[0].id);
        expect(cart.items[0].quality).toBe(1);
    });

    it("when decrement item with quality 1 it delete item", () => {
        const cart = createCart();
        cart.addItem(Item1);
        expect(cart.items[0].quality).toBe(1);
        cart.decrement(cart.items[0].id);
        expect(cart.items.length).toBe(0);
    });


    it("total items in cart with 1 item with quality 1", () => {
        const cart = createCart();
        cart.addItem(Item1);
        let total = cart.totalItems();
        expect(total).toBe(1);
    });

    it("total items with empty cart", () => {
        const cart = createCart();
        let total = cart.totalItems();
        expect(total).toBe(0);
    });

    it("total items with multiple items", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item2);
        let total = cart.totalItems();
        expect(total).toBe(2);
    });

    it("total items with multiple items and added quality", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.increment(cart.items[0].id);
        cart.increment(cart.items[0].id);
        cart.addItem(Item2);
        let total = cart.totalItems();
        expect(total).toBe(4);
    });

    it("total items with adding quality", () => {
        const cart = createCart();
        cart.addItem(Item1);
        expect(cart.totalItems()).toBe(1);
        cart.increment(cart.items[0].id);
        expect(cart.totalItems()).toBe(2);
        cart.increment(cart.items[0].id);
        expect(cart.totalItems()).toBe(3);
    });

    it("total items with removing quality", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.increment(cart.items[0].id);
        cart.increment(cart.items[0].id);
        expect(cart.totalItems()).toBe(3);
        cart.decrement(cart.items[0].id);
        expect(cart.totalItems()).toBe(2);
        cart.decrement(cart.items[0].id);
        expect(cart.totalItems()).toBe(1);
    });

    it("subtotal of 1 item with  quality 1", () => {
        const cart = createCart();
        cart.addItem(Item1);
        expect(cart.subtotal()).toBe(50);
    });

    it("subtotal of 1 item with quality more then 1", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item1);
        expect(cart.subtotal()).toBe(100);
    });

    it("subtotal of  multiple items with quality more then 1", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item2)
        expect(cart.subtotal()).toBe(121);
    });

    it("calculating tax for subtotal", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item1);
        expect(cart.tax()).toBe(7);
    });

    it("calculating shipping if subtotal>=500", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item1);
        cart.addItem(Item1);
        expect(cart.shipping()).toBe(0);
    });


    it("calculating shipping if subtotal<500", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item1);
        expect(cart.shipping()).toBe(20);
    });

    it("calculating total price", () => {
        const cart = createCart();
        cart.addItem(Item1);
        cart.addItem(Item1);
        expect(cart.totalPrice()).toBe(127);
    })

})
