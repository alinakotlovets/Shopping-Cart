import {useState, useEffect} from "react";
import getBooks from "./api/books.js";

function UseBooks() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getBooks()
            .then(setBooks)
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return {books, loading, error}
}

export default UseBooks;