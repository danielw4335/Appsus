import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { utilService } from '../services/util.service.js'
import { AddReview } from "../cmps/AddReview.jsx"

const { useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => console.log('err:', err))
    }

    function ChekReadingLevel(num) {
        if (num > 500) return 'Serious Reading'
        else if (num > 200) return 'Descent Reading'
        return 'Light Reading'
    }

    function ChekAgeStatus(year) {
        const today = new Date().getFullYear()
        return today - year >= 10 ? 'Vintage' : 'New'
    }

    function ChekPriceColor(num) {
        if (num > 150) return 'red'
        if (num < 20) return 'green'
    }

    if (!book) return <div>Loading...</div>

    const { title, listPrice, description, thumbnail, pageCount, publishedDate } = book

    return (
        <section className="book-details container">
            <div className="book-title">
                <h1>Book title: {title}</h1>
                <h2>
                    Book Price: <p style={{ color: ChekPriceColor(listPrice.amount) }}>{listPrice.amount}</p>
                </h2>
            </div>
            <img src={thumbnail} alt="Book Image" />

            <div className="book-txt">
                <h3>Description:</h3>
                <LongTxt text={description} />
                <h4>Reading level: {ChekReadingLevel(pageCount)}</h4>
                <h4>Book Age: {ChekAgeStatus(publishedDate)}</h4>
                {listPrice.isOnSale && <h4>On Sale</h4>}
            </div>

            <AddReview bookId={book.id} onUpdateBook={setBook} />

            <button><Link to={`/books/${book.prevBookId}`}>Prev Book</Link></button>
            <button><Link to={`/books/${book.nextBookId}`}>Next Book</Link></button>
        </section>
    )
}
