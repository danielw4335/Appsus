export function BookPreview({ book }) {
// console.log(book);

    const { title, listPrice, thumbnail } = book
    return (
        <article className="book-preview">
            <h2>title: {title}</h2>
            <h4>Price: {listPrice.amount}</h4>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )
}
