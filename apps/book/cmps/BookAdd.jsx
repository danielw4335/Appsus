import { bookService } from "../services/book.service.js"


const { useState, useEffect } = React

export function BookAdd() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])

    function onAddBook(book) {
        bookService.save(book)
            .then(() => {
                console.log('Book added:', book.title)
            })
    }

    function handleChange(ev) {
        setSearchTerm(ev.target.value)
    }

    function onSearch() {
        bookService.searchGoogleBooks(searchTerm)
            .then(setResults)
            .catch(err => console.error('Search error:', err))
    }



    return (
        <section className="book-add">
            <input
                type="text"
                value={searchTerm}
                onChange={ev => setSearchTerm(ev.target.value)}
                placeholder="Search for books..."
            />
            <button onClick={onSearch}>Search</button>

            <ul>
                {results.map(book => (
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => onAddBook(book)}>+</button>
                    </li>
                ))}
            </ul>
        </section>
    )

}



// bookService.addGoogleBook(googleBook) 