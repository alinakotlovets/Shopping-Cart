import {useOutletContext, useNavigate} from "react-router-dom";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import {useEffect} from "react";
import common from "../style/common.module.css"
import bookCart from "../style/bookCart.module.css"

function HomePage() {
    const {books, loading, error, cart} = useOutletContext();
    const sortedBooks = [...books];
    const navigate = useNavigate();

    useEffect(() => {

        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 4,


            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }, [books])

    const popularBooks = () => {
        sortedBooks.sort((a, b) => b.rating - a.rating);
        let firstTenItems = sortedBooks.slice(0, 10);
        return (
            firstTenItems.map((book, index) => {
                if (index >= 10) return;
                return (
                    <>
                        <div
                            className={`swiper-slide`}
                            key={book.id}
                            onClick={() => navigate(`/book/${book.id}`)}
                            style={{cursor: "pointer"}}
                        >
                            <div
                                className={`${common.padding14} ${common.borderGrey1px} ${bookCart.cartMinHeight} ${bookCart.cartBox}`}>
                                <img className={`${bookCart.bookImg}`} src={book.img} alt={book.name}/>
                                <div className={`${common.textAlignStart} ${common.with100}`}>
                                    <h4 className={`${common.marginTop10}`}>{book.name}</h4>
                                    <h4 className={`${common.marginTop5} ${common.textGrey}`}>{book.author}</h4>
                                    <h4 className={`${common.marginTop5} ${common.textGrey}`}>Rating: {book.rating}</h4>
                                </div>
                                <div className={`${common.flexSpaceBetween} ${common.with100} ${common.marginTop10}`}>
                                    <h3>{book.price}$</h3>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        cart.addItem(book)
                                    }}>Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })
        )
    }

    return (
        <div className={`${common.overflowXHidden} ${common.padding040} ${common.marginTop30}`}>
            {loading && (<h1>Loading...</h1>)}
            {!loading && error && (<h1>{error.status}</h1>)}
            {!loading && !error && books && (
                <div className={`${common.overflowXHidden}`}>
                    <div className="swiper">
                        <div className="swiper-wrapper">
                            {popularBooks()}
                        </div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default HomePage;