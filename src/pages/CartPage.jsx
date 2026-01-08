import {useOutletContext, useNavigate} from "react-router-dom";
import common from "../style/common.module.css"
import cartPage from "../style/cartPage.module.css"
import availableIcon from "../images/availableIcon.svg";

function CartPage() {
    const {items, cart} = useOutletContext();
    const navigate = useNavigate();

    const renderCartItems = () => {
        return (
            items.map((book) => {
                return (
                    <div
                        className={`${cartPage.bookBox}`}
                        key={book.id}
                    >
                        <div className={`${common.flex} ${common.gap32} ${common.textAlignStart}`}>
                            <img style={{cursor: "pointer"}} onClick={() => navigate(`/book/${book.id}`)}
                                 className={`${cartPage.cartBookImg}`} src={book.img} alt={book.name}/>
                            <div className={`${common.with100}`}>
                                <div className={`${common.flex} ${common.flexSpaceBetween}`}>
                                    <h3 style={{cursor: "pointer"}}
                                        onClick={() => navigate(`/book/${book.id}`)}>{book.name}</h3>
                                    <button
                                        className={`${cartPage.basketBtn}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            cart.removeItem(book.id)
                                        }}>
                                        <svg width="15" height="14" viewBox="0 0 16 17" fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                             plerdy-tracking-id="43176442901">
                                            <path
                                                d="M6.33331 7.33333V12.3333M9.66665 7.33333V12.3333M13 4V14C13 14.9205 12.2538 15.6667 11.3333 15.6667H4.66665C3.74617 15.6667 2.99998 14.9205 2.99998 14V4M1.33331 4H14.6666M10.5 4V3.16667C10.5 2.24619 9.75379 1.5 8.83331 1.5H7.16665C6.24617 1.5 5.49998 2.24619 5.49998 3.16667V4"
                                                stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                </div>
                                <h4 className={`${common.textGrey} ${common.marginTop5}`}>{book.author}</h4>
                                <div className={`${cartPage.bookBoxPricingBox}`}>
                                    <div className={`${cartPage.availableBox}`}>
                                        <img src={availableIcon} alt="available icon"/>
                                        <p className={`${common.textXS}`}>Available</p>
                                    </div>
                                    <div className={`${common.flex} ${common.flexCenter}`}>
                                        <div
                                            className={`${cartPage.quantityBtn}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                cart.decrement(book.id)
                                            }}>
                                            <svg width="24" height="2" viewBox="0 0 16 2" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg" plerdy-tracking-id="28630463601">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M0.938232 1C0.938232 0.447715 1.38595 0 1.93823 0H14.0594C14.6117 0 15.0594 0.447715 15.0594 1C15.0594 1.55228 14.6117 2 14.0594 2H1.93823C1.38595 2 0.938232 1.55228 0.938232 1Z"
                                                      fill="#3AAF78"></path>
                                            </svg>
                                        </div>
                                        <h3 className={`${cartPage.quantityTextBox}`}>{book.quality}</h3>
                                        <div
                                            className={`${cartPage.quantityBtn}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                cart.increment(book.id)
                                            }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg" plerdy-tracking-id="34908615501">
                                                <path d="M12 5.45453L12 18.5454" stroke="#3AAF78" stroke-width="2"
                                                      stroke-linecap="round"></path>
                                                <path d="M18.5454 12L5.4545 12" stroke="#3AAF78" stroke-width="2"
                                                      stroke-linecap="round"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3>{cart.pricePerBook(book.id)}$</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    const renderPricingBox = () => {
        return (
            <div className={`${common.flex} ${common.flexColumn} ${cartPage.pricingTextBox}`}>
                <h3>Pricing</h3>
                <div className={`${common.flex} ${common.flexSpaceBetween} ${common.textAlignStart}`}>
                    <h4 className={`${common.textGrey}`}>Subtotal:</h4>
                    <h4>{cart.subtotal()}$</h4>
                </div>
                <div className={`${common.flex} ${common.flexSpaceBetween} ${common.textAlignStart}`}>
                    <h4 className={`${common.textGrey}`}>Tax ({Math.round(cart.taxPercent * 100)}%):</h4>
                    <h4>{cart.tax()}$</h4>
                </div>
                <div className={`${common.flex} ${common.flexSpaceBetween} ${common.textAlignStart}`}>
                    <h4 className={`${common.textGrey}`}>Shipping:</h4>
                    <h4>{cart.shipping()}$</h4>
                </div>
                <div className={`${common.flex} ${common.flexSpaceBetween} ${common.textAlignStart}`}>
                    <h3>Total price:</h3>
                    <h3>{cart.totalPrice()}$</h3>
                </div>
                <button className={`${common.marginTop10}`}>Checkout</button>
            </div>
        )
    }

    return (
        <>
            <div className={`${cartPage.shippingInfo}`}>
                <h4 className={`${cartPage.shippingInfoText}`}>Shipping is free if your subtotal 500 or more!</h4>
            </div>
            <div
                className={`${common.flex} ${common.flexCenter} ${common.padding040} ${common.marginTop30} ${common.with100}`}>
                <div className={` ${common.height100} ${common.with100} `}>

                    {items && items.length > 0 ? (
                        <div className={`${common.flex} ${common.flexCenter} ${common.flexColumn} ${common.gap32}`}>
                            <div
                                className={`${cartPage.booksInCartBox}`}>
                                {renderCartItems()}
                            </div>
                            <div className={`${cartPage.pricingBox}`}>
                                <button
                                    className={`${common.buttonWhite}`}
                                    onClick={() => navigate(`/shop`)}>Continue shopping
                                </button>
                                {renderPricingBox()}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`${common.flex} ${common.flexCenter} ${common.height100} ${cartPage.emptyCartMinHeight}`}>
                            <h2>The cart is empty</h2>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CartPage;