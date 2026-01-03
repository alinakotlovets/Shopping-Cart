import App from "./App.jsx";
import ErrorPage from "./ErrorPage";
import HomePage from "./HomePage.jsx";
import ShopPage from "./ShopPage.jsx";
import CartPage from "./CartPage.jsx";


const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: "shop", element: <ShopPage/>},
            {path: "cart", element: <CartPage/>},
        ],
    }
]
export default routes;