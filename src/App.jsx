import './style/App.css'
import useBooks from "./utils/useBooks.jsx";
import NavBar from "./NavBar.jsx";
import CartActions from "./cart/cart.jsx"
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

function App() {

    const {books, loading, error} = useBooks();
    const [items, setItems] = useState([]);
    const cart = CartActions({items, setItems});

    useEffect(() => {
        console.log(books);
    }, [books])

    return (
        <>
            <NavBar cart={cart} books={books}/>
            <Outlet context={{books, loading, error, cart, items}}/>
        </>
    );
}

export default App
