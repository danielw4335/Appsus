const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx";

export function BookList({ loadingClass, books, onRemoveBook, onSelectBookId }) {

    if (!books.length) return <div>No Books To Show...</div>
    return (
        <ul className="book-list container">
            {books.map(book => (
                <li className={loadingClass} key={book.id}>
                    <BookPreview book={book} />
                    <section className="btn-feature">
                        <button onClick={() => onRemoveBook(book.id)}>
                            Remove
                        </button>
                        <button >
                            <Link to={`/books/${book.id}`}>Details</Link>
                        </button>
                        <button >
                            <Link to={`/books/edit/${book.id}`}>Edit</Link>
                        </button>      
                         <button >
                            <Link to={'/books/edit'}>Add</Link>
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )

}