import './App.css'
import useBooks from "./useBooks.jsx";

function App() {
    const {books, loading, error} = useBooks();

    return (
        <div>
            {loading && <h1>Loading...</h1>}
            {!loading && error && <h1>{error.status}</h1>}
            {!loading && !error && books && <h1>books</h1>}
        </div>
    );
}

export default App
