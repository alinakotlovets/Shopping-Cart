import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import bookShopLogo from "./images/bookShop.png"
import cartIcon from "./images/cartIcon.svg"
import searchIcon from "./images/searchIcon.svg"
import common from "./style/common.module.css"
import navBar from "./style/navBar.module.css"

function NavBar({cart, books}) {
    const [searchInput, setSearchInput] = useState("");
    const [searchFound, setSearchFound] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
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

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            <nav className={`${common.flex} ${common.flexSpaceBetween} ${navBar.navBarBox} `}>
                <div className={`${common.flex} ${common.flexCenter} ${navBar.leftSide}`}>
                    <button
                        className={navBar.burgerBtn}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <span/>
                        <span/>
                        <span/>
                    </button>
                    <Link to="/">
                        <img className={navBar.navLogo} src={bookShopLogo} alt="book shop logo"/>
                    </Link>

                    <div
                        className={`${navBar.navLinks} ${
                            menuOpen ? navBar.navLinksOpen : ""
                        }`}
                    >
                        <div className={`${navBar.mobileCloseBtnBox}`}>
                            <button className={`${navBar.mobileCloseBtn}`} onClick={() => setMenuOpen(false)}>
                                <svg width="30" height="30" viewBox="0 0 21 22" fill="none" stroke="currentColor"
                                     plerdy-tracking-id="89573919001">
                                    <path d="M5 16.5L16 5.5M16 16.5L5 5.5" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className={`${navBar.navLinks} ${
                            menuOpen ? navBar.navLinksOpen : ""
                        }`}>
                            <li>
                                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                            </li>
                            <li>
                                <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={`${navBar.desktopSearch} ${common.flex} ${common.flexCenter} ${common.with100}`}>
                    <input
                        className={navBar.navInput}
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Write book title or author"
                    />
                    <button className={navBar.searchBtn} onClick={searchOnClick}>
                        <img src={searchIcon} alt="search icon"/>
                    </button>
                </div>
                <div className={`${common.flex} ${common.flexCenter} ${navBar.rightSide}`}>

                    <Link to="/cart">
                        <div className={navBar.cartButtonBox}>
                            <img src={cartIcon} alt="cart icon"/>
                            {cart.totalItems() > 0 && (
                                <div className={navBar.cartButtonTextBg}>
                                    <p className={navBar.cartButtonText}>{cart.totalItems()}</p>
                                </div>
                            )}
                        </div>
                    </Link>
                </div>
            </nav>
            <div className={navBar.mobileSearch}>
                <input
                    className={navBar.navInput}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Write book title or author"
                />
                <button className={navBar.searchBtn} onClick={searchOnClick}>
                    <img src={searchIcon} alt="search icon"/>
                </button>
            </div>
            <>
                {searchFound !== null && searchFound.length > 0 ?
                    (
                        <div
                            className={`${common.with100} ${common.flex} ${common.flexColumn} ${common.flexCenter}`}>
                            <div className={`${navBar.canselButtonBox}`}>
                                <button className={`${navBar.canselButton}`} onClick={() => setSearchFound(null)}>
                                    <svg width="30" height="30" viewBox="0 0 21 22" fill="none" stroke="currentColor"
                                         plerdy-tracking-id="89573919001">
                                        <path d="M5 16.5L16 5.5M16 16.5L5 5.5" stroke-width="2" stroke-linecap="round"
                                              stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                            {searchFound.map((item) => {
                                return (
                                    <>
                                        <div
                                            className={`${navBar.searchBookBox}`}
                                            onClick={(e) => foundClick(e, item.id)}
                                            style={{cursor: "pointer"}}
                                        >
                                            <div className={`${common.flex} ${common.gap32}`}>
                                                <img className={navBar.searchBookImg} src={item.img} alt={item.name}/>
                                                <div className={`${common.flex} ${common.flexColumn}`}>
                                                    <h3>{item.name}</h3>
                                                    <h3 className={`${common.textGrey}`}>{item.author}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            }
                        </div>
                    ) : searchFound !== null && searchFound.length === 0 ? (
                        <div className={`${common.flex} ${common.flexCenter} ${common.flexColumn}`}>
                            <button className={`${navBar.canselButton}`} onClick={() => setSearchFound(null)}>
                                <svg width="30" height="30" viewBox="0 0 21 22" fill="none" stroke="currentColor"
                                     plerdy-tracking-id="89573919001">
                                    <path d="M5 16.5L16 5.5M16 16.5L5 5.5" stroke-width="2" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                </svg>
                            </button>
                            <div className={`${navBar.notFoundBox}`}>
                                <h2>Not found</h2>
                            </div>
                        </div>
                    ) : null}
            </>
        </>
    )

}

export default NavBar;