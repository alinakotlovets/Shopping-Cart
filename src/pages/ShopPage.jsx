import {useOutletContext, useNavigate} from "react-router-dom";
import {useState} from "react";
import common from "../style/common.module.css"
import bookCart from "../style/bookCard.module.css"

function ShopPage() {
    const {books, loading, error, cart} = useOutletContext();
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState("default");

    const handelSortChange = (e) => {
        setSortOption(e.target.value)
    }

    const sortedBooks = [...books];
    if (sortOption === "bestScore") {
        sortedBooks.sort((a, b) => b.rating - a.rating)
    } else if (sortOption === "leastScore") {
        sortedBooks.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "lowestPrice") {
        sortedBooks.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highestPrice") {
        sortedBooks.sort((a, b) => b.price - a.price);
    }

    const renderBookList = () => {
        return (
            sortedBooks.map((book) => {
                return (
                    <div
                        className={`${common.padding14} ${common.borderGrey1px} ${common.flexCenter} ${common.flex} ${common.flexColumn} ${bookCart.cartMinHeight} ${bookCart.cartBox}`}
                        key={book.id}
                        onClick={() => navigate(`/book/${book.id}`)}
                        style={{cursor: "pointer"}}
                    >
                        <img className={`${bookCart.bookImg}`} src={book.img} alt={book.name}/>
                        <div className={`${common.textAlignStart} ${common.with100}`}>
                            <h4 className={`${common.marginTop10} ${common.textS}`}>{book.name}</h4>
                            <h4 className={`${common.marginTop5} ${common.textGrey} ${common.textS}`}>{book.author}</h4>
                            <h4 className={`${common.marginTop5} ${common.textGrey} ${common.textS}`}>Rating: {book.rating}</h4>
                        </div>
                        <div
                            className={` ${common.flex} ${common.flexSpaceBetween} ${common.with100} ${common.marginTop10}`}>
                            <h3 className={`${common.textM}`}>{book.price}$</h3>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                cart.addItem(book)
                            }}>Buy
                            </button>
                        </div>
                    </div>
                )
            })
        )
    }
    return (
        <>
            <div className={`${common.flex} ${common.flexSpaceBetween} ${common.padding040} ${common.marginTop20}`}>
                <p className={`${common.textS} ${common.textGrey}`}>{sortedBooks.length} book available</p>
                <div className={`${common.flexCenter} ${common.flex} ${common.gap32}`}>
                    <label htmlFor="sortBooks">Sort by:</label>
                    <select id="sortBooks" name="Sort books" onChange={(e) => handelSortChange(e)}>
                        <option value="default">Default</option>
                        <option value="bestScore">Best score</option>
                        <option value="leastScore">Least score</option>
                        <option value="lowestPrice">Lowest price</option>
                        <option value="highestPrice">Highest price</option>
                    </select>
                </div>
            </div>
            {loading && (<h1>Loading...</h1>)}
            {!loading && error && (<h1>{error.status}</h1>)}
            {!loading && !error && books &&
                (<div className={`${common.gridColumns4} ${common.marginTop20} ${common.padding040}`}>
                    {renderBookList()}
                </div>)}
        </>
    )
}

export default ShopPage;