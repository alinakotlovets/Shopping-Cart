export default function CartActions({items, setItems}) {
    const taxPercent = 0.07;

    function findIndexById(itemId) {
        return items.findIndex(item => item.id === itemId);
    }

    return {
        taxPercent,
        addItem(item) {
            const index = findIndexById(item.id);

            if (index !== -1) {
                setItems(prevItems =>
                    prevItems.map((it, i) => i === index ? {...it, quality: it.quality + item.quality} : it))
            } else {
                setItems(prevItems => [...prevItems, item]);
            }
        },
        removeItem(itemId) {
            const index = findIndexById(itemId);
            if (index !== -1) {
                setItems(prevItems => prevItems.filter(it => it.id !== itemId));
            }
        },
        increment(itemId) {
            const index = findIndexById(itemId);
            if (index !== -1) {
                setItems(prevItems => prevItems.map((it, i) => i === index ? {...it, quality: it.quality + 1} : it))
            }
        },
        decrement(itemId) {
            const index = findIndexById(itemId);
            setItems(prevItems => {
                const updated = prevItems.map((it, i) => {
                    if (i === index) {
                        return {...it, quality: it.quality - 1};
                    }
                    return it;
                });
                return updated.filter(it => it.quality > 0);
            });

        },
        totalItems() {
            let total = 0;
            items.forEach(item => total += item.quality);
            return total;
        },
        subtotal() {
            let total = 0;
            items.forEach(item => total += item.price * item.quality);
            return total;
        },
        tax() {
            let total = this.subtotal();
            return Math.round((total * taxPercent) * 100) / 100;
        },
        shipping() {
            let subtotal = this.subtotal();
            if (subtotal >= 500) {
                return 0;
            } else {
                return 20;
            }
        },
        pricePerBook(itemId) {
            const item = items.find(item => item.id === itemId);
            return item ? item.price * item.quality : 0;
        },
        totalPrice() {
            return this.subtotal() + this.tax() + this.shipping();
        }
    }
}
