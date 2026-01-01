export default function createCart() {
    let items = [];
    const taxPercent = 0.07;

    function findIndexById(itemId) {
        return items.findIndex(item => item.id === itemId);
    }

    return {
        items,
        addItem(item) {
            const index = findIndexById(item.id);
            if (index !== -1) {
                items[index].quality += item.quality;
            } else {
                items.push({...item})
            }
        },
        removeItem(itemId) {
            const index = findIndexById(itemId);
            if (index !== -1) items.splice(index, 1);
        },
        increment(itemId) {
            const index = findIndexById(itemId);
            if (index !== -1) items[index].quality += 1;
        },
        decrement(itemId) {
            const index = findIndexById(itemId);
            if (index !== -1) {
                if (items[index].quality === 1) {
                    this.removeItem(itemId)
                } else {
                    items[index].quality -= 1;
                }
            }
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
        totalPrice() {
            return this.subtotal() + this.tax() + this.shipping();
        }
    }
}
