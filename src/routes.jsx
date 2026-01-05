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
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: "shop", element: <ShopPage/>},
            {path: "cart", element: <CartPage/>},
            {path: "book/:id", element: <BookPage/>}
        ],
    }
]
export default routes;