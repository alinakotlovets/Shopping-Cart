import {useOutletContext, useNavigate} from "react-router-dom";

function CartPage() {
    const {items, cart} = useOutletContext();
    const navigate = useNavigate();

    const renderCartItems = () => {
        return (
            items.map((book) => {
                return (
                    <div
                        key={book.id}
                        onClick={() => navigate(`/book/${book.id}`)}
                        style={{cursor: "pointer"}}
                    >
                        <img src={book.img} alt={book.name}/>
                        <h2>{book.name}</h2>
                        <h3>Author: {book.author}</h3>
                        <h3>Price: {cart.pricePerBook(book.id)}</h3>
                        <div>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                cart.decrement(book.id)
                            }}> -
                            </button>
                            <h3>{book.quality}</h3>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                cart.increment(book.id)
                            }}> +
                            </button>
                        </div>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            cart.removeItem(book.id)
                        }}>Delete
                        </button>
                    </div>
                )
            })
        )
    }

    const renderPricingBox = () => {
        return (
            <div>
                <h3>Pricing</h3>
                <h3>Subtotal: {cart.subtotal()}</h3>
                <h3>Tax ({Math.round(cart.taxPercent * 100)}%): {cart.tax()}</h3>
                <h3>Shipping: {cart.shipping()}</h3>
                <h3>Total price: {cart.totalPrice()}</h3>
                <h4>Shipping is free if your subtotal 500 or more</h4>

            </div>
        )
    }

    return (
        <>
            <h1>
                Cart
            </h1>
            <div>

                {items && items.length > 0 ? (
                    <>
                        {renderCartItems()}
                        {renderPricingBox()}
                    </>
                ) : (<h2>The cart is empty</h2>)}
            </div>
        </>
    )
}

export default CartPage;