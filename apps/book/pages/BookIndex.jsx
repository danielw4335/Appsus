import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { getTruthyValues } from "../services/util.service.js"


const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    // console.log('filterBy:', filterBy)

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        setIsLoading(true)
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg(`Book (${bookId}) removed successfully!`)

            })
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }


    const loadingClass = isLoading ? 'loading' : ''
    // console.log('selectedBookId:', selectedBookId)
    return (
        <section className="book-index">
            {selectedBookId &&
                <BookDetails
                    onBack={() => onSelectBookId(null)}
                    bookId={selectedBookId}

                />

            }
            {!selectedBookId && (
                books
                    ? <React.Fragment>
                        <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                        <BookList
                            loadingClass={loadingClass}
                            books={books}
                            onRemoveBook={onRemoveBook}
                            onSelectBookId={onSelectBookId}
                        />
                    </React.Fragment>
                    : <div>Loading...</div>
            )}
        </section>
    )

}

