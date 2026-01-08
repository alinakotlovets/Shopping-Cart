import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import BookPage from "./pages/BookPage.jsx";


const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: "shop", element: <ShopPage/>},
            {path: "cart", element: <CartPage/>},
            {path: "book/:id", element: <BookPage/>},
            {path: "*", element: <ErrorPage/>},
        ],
    }
]
export default routes;