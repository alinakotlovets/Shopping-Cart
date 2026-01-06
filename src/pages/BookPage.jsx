import {useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getBookWork from "../api/bookWork.js";
import getBookEdition from "../api/bookEdition.js";
import availableIcon from "../images/availableIcon.svg"
import common from "../style/common.module.css"
import bookPage from "../style/bookPage.module.css";

function BookPage() {
    const {id} = useParams();
    const {books, cart} = useOutletContext();

    const book = books.find(b => b.id === id);

    const [edition, setEdition] = useState({data: null, error: null, loading: true});
    const [work, setWork] = useState({data: null, error: null, loading: true});


    useEffect(() => {
        console.log(id);
        console.log(books.map(b => b.id));
        if (!book) return;

        getBookWork(book)
            .then(data => setWork({data: data, error: null, loading: false}))
            .catch(err => setWork({data: null, error: err, loading: false}));

        getBookEdition(book)
            .then(data => setEdition({data: data, error: null, loading: false}))
            .catch(err => setEdition({data: null, error: err, loading: false}));

    }, [book]);

    if (!book) return (
        <div className={`${common.flexCenter} ${common.flex} ${common.padding040} ${common.height100}`}>
            <h1>Not Found</h1>
        </div>
    )

    return (
        <div key={book.id} className={`${common.marginTop30} ${common.padding14}`}>
            <div className={`${common.flexStart} ${common.flex} ${common.textAlignStart} ${common.gap32}`}>
                <div className={`${common.leftBox}`}></div>
                <img className={`${bookPage.bookPageImg}`} src={book.img} alt={book.name}/>
                <div>
                    <div>
                        <h2>{book.name}</h2>
                        <h3 className={`${common.marginTop5}`}>Author: {book.author}</h3>
                    </div>
                    <div className={`${common.marginTop30}`}>
                        {work.loading ? <p>Loading description...</p> :
                            work.error ?
                                <h4>{work.error instanceof Error ? work.error.message : String(work.error)}</h4>
                                :
                                <h4 className={`${bookPage.bookDescription}`}>Description: {work.data.description || null}</h4>}
                    </div>
                </div>
                <div className={`${bookPage.rightBox}`}>
                    <div className={`${bookPage.priceBox}`}>
                        <h2>Price: {book.price}$</h2>
                        <div className={`${bookPage.availableBox}`}>
                            <img src={availableIcon} alt="available icon"/>
                            <p className={`${common.textXS}`}>Available</p>
                        </div>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            cart.addItem(book)
                        }}>Buy
                        </button>
                    </div>
                    <div className={`${common.marginTop10}`}>
                        {edition.loading ? <p>Loading edition info...</p> :
                            edition.error ?
                                <p>{edition.error instanceof Error ? edition.error.message : String(edition.error)}</p> :
                                <>
                                    <div
                                        className={`${bookPage.rightBoxTextBox}`}>
                                        <h4>Pages: </h4>
                                        <h4>{edition.data.pages}</h4>
                                    </div>
                                    <div
                                        className={`${bookPage.rightBoxTextBox}`}>
                                        <h4>Publish date: </h4>
                                        <h4>{edition.data.date} </h4>
                                    </div>
                                    <div
                                        className={`${bookPage.rightBoxTextBox}`}>
                                        <h4>Publishers: </h4>
                                        <h4>{edition.data.publishers.join(", ")}</h4>
                                    </div>
                                </>}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BookPage;