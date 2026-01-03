import './App.css'
import useBooks from "./useBooks.jsx";
import NavBar from "./NavBar.jsx";
import CartActions from "./cart/cart.jsx"
import {Outlet} from "react-router-dom";
import {useState} from "react";

function App() {

    const {books, loading, error} = useBooks();
    const [items, setItems] = useState([]);
    const cart = CartActions({items, setItems});

    return (
        <>
            <NavBar/>
            <Outlet context={{books, loading, error, cart, items}}/>
        </>
    );
}

export default App
