import {useOutletContext, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getBookWork from "../api/bookWork.js";
import getBookEdition from "../api/bookEdition.js";

function BookPage() {
    const {id} = useParams();
    const {books} = useOutletContext();

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

    if (!book) return <h1>Not Found</h1>

    return (
        <div key={book.id}>
            <div>
                <img src={book.img} alt={book.name}/>
                <h2>{book.name}</h2>
                <h3>Author: {book.author}</h3>
                <h3>Price: {book.price}</h3>
            </div>
            <div>
                {work.loading ? <p>Loading description...</p> :
                    work.error ? <p>{work.error}</p> :
                        <p>{work.data.description}</p>}
            </div>
            <div>
                {edition.loading ? <p>Loading edition info...</p> :
                    edition.error ? <p>{edition.error}</p> :
                        <>
                            <p>Pages: {edition.data.pages}</p>
                            <p>Publish date: {edition.data.date}</p>
                            <p>Publishers: {edition.data.publishers.join(", ")}</p>
                        </>}
            </div>
        </div>
    )

}

export default BookPage;