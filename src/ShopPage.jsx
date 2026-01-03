import {useOutletContext} from "react-router-dom";

function ShopPage() {
    const {books, loading, error, cart} = useOutletContext();

    const renderBookList = () => {
        return (
            books.map((book) => {
                return (
                    <div key={book.id}>
                        <img src={book.img} alt={book.name}/>
                        <h2>{book.name}</h2>
                        <h3>Author: {book.author}</h3>
                        <h3>Price: {book.price}</h3>
                        <h3>Rating: {book.rating}</h3>
                        <button onClick={() => cart.addItem(book)}>Add to cart</button>
                    </div>
                )
            })
        )
    }
    return (
        <>
            <h1>Shop</h1>
            {loading && (<h1>Loading...</h1>)}
            {!loading && error && (<h1>{error.status}</h1>)}
            {!loading && !error && books && (<div>{renderBookList()}</div>)}
        </>
    )
}

export default ShopPage;