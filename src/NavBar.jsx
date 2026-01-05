import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

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
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                </ul>
                <div>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button onClick={(e) => searchOnClick(e)}>Search</button>
                    <button onClick={() => setSearchFound(null)}>Cansel</button>
                </div>
                <div>
                    <Link to="/cart">Cart</Link>
                    <p>{cart.totalItems()}</p>
                </div>
            </nav>
            <div>
                {searchFound !== null && searchFound.length > 0 ?
                    (<> {searchFound.map((item) => {
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