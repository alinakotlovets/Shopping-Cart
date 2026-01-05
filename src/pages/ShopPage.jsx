import {useOutletContext, useNavigate} from "react-router-dom";
import {useState} from "react";

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
                        key={book.id}
                        onClick={() => navigate(`/book/${book.id}`)}
                        style={{cursor: "pointer"}}
                    >
                        <img src={book.img} alt={book.name}/>
                        <h2>{book.name}</h2>
                        <h3>Author: {book.author}</h3>
                        <h3>Price: {book.price}</h3>
                        <h3>Rating: {book.rating}</h3>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            cart.addItem(book)
                        }}>Add to cart
                        </button>
                    </div>
                )
            })
        )
    }
    return (
        <>
            <h1>Shop</h1>
            <label htmlFor="sortBooks">Sort by:</label>
            {loading && (<h1>Loading...</h1>)}
            {!loading && error && (<h1>{error.status}</h1>)}
            {!loading && !error && books &&
                (<div>
                    <select id="sortBooks" name="Sort books" onChange={(e) => handelSortChange(e)}>
                        <option value="default">Default</option>
                        <option value="bestScore">Best score</option>
                        <option value="leastScore">Least score</option>
                        <option value="lowestPrice">Lowest price</option>
                        <option value="higestPrice">Highest price</option>
                    </select>
                    {renderBookList()}
                </div>)}
        </>
    )
}

export default ShopPage;