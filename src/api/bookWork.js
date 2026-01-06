async function getBookWork(book) {
    const response = await fetch(`https://openlibrary.org/works/${book.id}.json`);
    if (!response.ok) {
        throw new Error(response.status);
    }
    const data = await response.json();
    if (!data) {
        throw new Error("NotFound");
    }

    return {
        description: typeof data.description === "string"
            ? data.description
            : data.description?.value || null
    }
}

export default getBookWork;