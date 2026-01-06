async function getBookEdition(book) {
    const response = await fetch(`https://openlibrary.org/books/${book.editionId}.json`);
    if (!response.ok) {
        throw new Error(response.status);
    }
    const data = await response.json();
    if (!data) {
        throw new Error("NotFound");
    }

    return {
        pages: data.number_of_pages ? data.number_of_pages : data.pagination || null,
        date: data.publish_date,
        publishers: data.publishers,
    }
}

export default getBookEdition;