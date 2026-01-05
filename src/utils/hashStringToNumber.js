function hashStringToNumber(str, min, max) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    const scaled = (hash % 1000) / 1000;
    const number = min + (max - min) * scaled;
    return Math.round(number * 10) / 10;
}

export default hashStringToNumber;
