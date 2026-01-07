import {useOutletContext, useNavigate} from "react-router-dom";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import {useEffect} from "react";
import common from "../style/common.module.css"
import bookCart from "../style/bookCard.module.css"
import BannerSale1 from "../images/BanerSale1.jpg"
import BannerSale2 from "../images/BanerSale2.jpg"
import BannerSale3 from "../images/BanerSale3.jpg"

function HomePage() {
    const {books, loading, error, cart} = useOutletContext();
    const sortedBooks = [...books];
    const navigate = useNavigate();

    useEffect(() => {
        const swiperBanner = new Swiper('.swiperBanner', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: "auto",
            navigation: {
                nextEl: '.swiperBanner-button-next',
                prevEl: '.swiperBanner-button-prev',
            },
        });

        const swiperBooks = new Swiper('.swiperBooks', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 4,
            navigation: {
                nextEl: '.swiperBooks-button-next',
                prevEl: '.swiperBooks-button-prev',
            },
            breakpoints: {
                1200: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 3,
                },
            },
        });
    }, [books]);


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
                                <div
                                    className={` ${common.flex} ${common.flexSpaceBetween} ${common.with100} ${common.marginTop10}`}>
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
        <>
            <div className={`${common.marginTop30}`}>
                <div>
                    <div className={`${common.overflowXHidden}`}>
                        <div className="swiperBanner">
                            <div className="swiper-wrapper">
                                <div className={`swiper-slide`}>
                                    <img className={`${common.with100} ${common.maxHeight600}`}
                                         src={BannerSale1}
                                         onClick={() => navigate(`/shop`)}
                                         style={{cursor: "pointer"}}
                                         alt="banner about sale"/>
                                </div>
                                <div className={`swiper-slide`}>
                                    <img className={`${common.with100} ${common.maxHeight600}`}
                                         src={BannerSale2}
                                         onClick={() => navigate(`/shop`)}
                                         style={{cursor: "pointer"}}
                                         alt="banner about sale"/>
                                </div>
                                <div className={`swiper-slide`}>
                                    <img className={`${common.with100} ${common.maxHeight600}`}
                                         src={BannerSale3}
                                         onClick={() => navigate(`/shop`)}
                                         style={{cursor: "pointer"}}
                                         alt="banner about sale"/>
                                </div>
                            </div>
                            <div onClick={(e) => {
                                e.stopPropagation();
                            }}
                                 className="swiperBanner-button-prev">
                                <svg width="10" height="16" viewBox="0 0 10 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L1 8L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div onClick={(e) => {
                                e.stopPropagation();
                            }}
                                 className="swiperBanner-button-next">
                                <svg width="10" height="16" viewBox="0 0 10 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L9 8L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${common.overflowXHidden} ${common.padding040} ${common.marginTop20}`}>
                {loading && (<h1>Loading...</h1>)}
                {!loading && error && (<h1>{error.status}</h1>)}
                {!loading && !error && books && (
                    <div>
                        <div className={`${common.flex} ${common.flexSpaceBetween} ${common.flexCenter} `}>
                            <p className={`${common.textGrey}`}>Popular books</p>
                            <button onClick={() => navigate(`/shop`)}>See more</button>
                        </div>
                        <div className={`${common.overflowXHidden} ${common.marginTop10}`}>
                            <div className="swiperBooks">
                                <div className="swiper-wrapper">
                                    {popularBooks()}
                                </div>
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                     className="swiperBooks-button-prev">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L1 8L9 15" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                     className="swiperBooks-button-next">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L9 8L1 15" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}

export default HomePage;