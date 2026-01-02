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

    let books = [];
    data.reading_log_entries.forEach((item) => books.push({
        id: item.work.key,
        name: item.work.title,
        price: hashStringToNumber(item.work.key, 15, 30),
        quality: 1,
        author: item.work.author_names[0],
        img: item.work.cover_id ? `https://covers.openlibrary.org/b/id/${item.work.cover_id}.jpg` : "fallback_url"
    }))

    return books;
}

export default getBooks;