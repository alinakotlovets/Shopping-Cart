import hashStringToNumber from "../utils/hashStringToNumber.js"

async function getBooks() {
    const response = await fetch("https://openlibrary.org/people/v4cvwz_mpk_6skg/books/want-to-read.json");
    if (!response.ok) {
        throw new Error(response.status);
    }
    const data = await response.json();
    if (!data) {
        throw new Error("NotFound");
    }

    const getCleanId = (item) => {
        return item.replace("/works/", "");
    }

    let books = [];
    data.reading_log_entries.forEach((item) => books.push({
        id: getCleanId(item.work.key),
        editionId: item.work.edition_key[0],
        name: item.work.title,
        price: Math.round(hashStringToNumber(item.work.key, 15, 30)),
        quality: 1,
        author: item.work.author_names[0],
        rating: hashStringToNumber(item.work.key, 3.5, 5.0),
        img: item.work.cover_id ? `https://covers.openlibrary.org/b/id/${item.work.cover_id}.jpg` : "fallback_url"
    }))

    return books;
}

export default getBooks;