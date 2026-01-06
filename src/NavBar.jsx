import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import bookShopLogo from "./images/bookShop.png"
import cartIcon from "./images/cartIcon.svg"
import searchIcon from "./images/searchIcon.svg"
import common from "./style/common.module.css"
import navBar from "./style/navBar.module.css"

function NavBar({cart, books}) {
    const [searchInput, setSearchInput] = useState("");
    const [searchFound, setSearchFound] = useState(null);
    const navigate = useNavigate();

    const searchOnClick = (e) => {
        e.preventDefault();
        setSearchFound(null);
        const results = books.filter((book) => {
            return (
                book.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                book.author.toLowerCase().includes(searchInput.toLowerCase())
            );
        });

        setSearchFound(results);
        setSearchInput("");
    }

    const foundClick = (e, bookId) => {
        e.preventDefault();
        setSearchFound(null);
        navigate(`/book/${bookId}`);
    }

    return (
        <>
            <nav className={`${common.flexSpaceBetween} ${navBar.navBarBox} `}>
                <ul className={`${common.flexCenter} ${common.flex} ${common.gap32}`}>
                    <li>
                        <Link to="/">
                            <img className={`${navBar.navLogo}`} src={bookShopLogo} alt="book shop logo"/>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                </ul>
                <div className={`${common.flexCenter} ${common.flex} ${common.with100}`}>
                    <input
                        className={`${navBar.navInput}`}
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Write book title or author"
                    />
                    <button className={`${navBar.searchBtn}`} onClick={(e) => searchOnClick(e)}>
                        <img src={searchIcon} alt='search icon button'/>
                    </button>
                </div>
                <div>
                    <Link to="/cart">
                        <div className={`${navBar.cartButtonBox}`}>
                            <img src={cartIcon} alt="cart icon button"/>
                            <>
                                {cart.totalItems() > 0 ?
                                    (
                                        <div className={`${navBar.cartButtonTextBg}`}>
                                            <p className={`${navBar.cartButtonText}`}>{cart.totalItems()}</p>
                                        </div>
                                    ) : null}
                            </>
                        </div>
                    </Link>
                </div>
            </nav>
            <div>
                {searchFound !== null && searchFound.length > 0 ?
                    (<>
                            <button onClick={() => setSearchFound(null)}>Cansel</button>
                            {searchFound.map((item) => {
                                return (
                                    <>
                                        <div
                                            onClick={(e) => foundClick(e, item.id)}
                                            style={{cursor: "pointer"}}
                                        >
                                            <img src={item.img} alt={item.name}/>
                                            <h3>{item.name}</h3>
                                            <h3>{item.author}</h3>
                                        </div>
                                    </>
                                )
                            })
                            }
                        </>
                    ) : searchFound !== null && searchFound.length === 0 ? (<h2>Not found</h2>) : null}
            </div>
        </>
    )

}

export default NavBar;