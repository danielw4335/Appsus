import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'
import { NameInput } from './dynamic-inputs.NameInput.jsx'
import { RateInput } from './dynamic-inputs.RateInput.jsx'
import { DateInput } from './dynamic-inputs.DateInput.jsx'

const { useState, useEffect } = React

export function AddReview({ bookId, onUpdateBook }) {
    const [review, setReview] = useState({
        fullname: '',
        rating: '',
        readAt: ''
    })

    const [cmpType, setCmpType] = useState('name')
    const [book, setBook] = useState(null)

    useEffect(() => {
        if (bookId) bookService.get(bookId).then(setBook)
    }, [bookId])

    function onSetInput(newInput) {
        setReview(prev => ({ ...prev, ...newInput }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const newReview = {
            id: utilService.makeId(),
            fullname: review.fullname,
            rating: +review.rating,
            readAt: review.readAt || new Date().toISOString().split('T')[0]
        }

        const updatedBook = {
            ...book,
            reviews: [...(book.reviews || []), newReview]
        }

        bookService.save(updatedBook)
            .then(savedBook => {
                setBook(savedBook)
                setReview({ fullname: '', rating: '', readAt: '' })
                if (onUpdateBook) onUpdateBook(savedBook)
            })
            .catch(err => console.error('Failed to save review', err))
    }

    function onDeleteReview(reviewId) {
        const updatedBook = {
            ...book,
            reviews: book.reviews.filter(r => r.id !== reviewId)
        }

        bookService.save(updatedBook)
            .then(savedBook => {
                setBook(savedBook)
                if (onUpdateBook) onUpdateBook(savedBook)
            })
            .catch(err => console.error('Failed to delete review', err))
    }

    if (!book) return <p>Loading reviews...</p>

    return (
        <section className="reviews">
            <h3>Add a Review</h3>

            <form onSubmit={onSubmit}>
                <DynamicCmp
                    cmpType={cmpType}
                    name={review.fullname}
                    rate={review.rating}
                    date={review.readAt}
                    onSetInput={onSetInput}
                />

                <select value={cmpType} onChange={(ev) => setCmpType(ev.target.value)}>
                    <option value="name">Name</option>
                    <option value="rate">Rating</option>
                    <option value="date">Date</option>
                </select>

                <button type="submit">Add Review</button>
            </form>

            {book.reviews && book.reviews.length > 0 && (
                <section className="review-list">
                    <h4>Reviews:</h4>
                    <ul>
                        {book.reviews.map(r => (
                            <li key={r.id}>
                                <p><strong>{r.fullname}</strong> - ⭐ {r.rating}</p>
                                <p>{r.readAt}</p>
                                <button onClick={() => onDeleteReview(r.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </section>
    )
}

function DynamicCmp(props) {
    const cmpMap = {
        name: <NameInput name={props.name} onSetInput={props.onSetInput} />,
        rate: <RateInput rate={props.rate} onSetInput={props.onSetInput} />,
        date: <DateInput date={props.date} onSetInput={props.onSetInput} />
    }

    return cmpMap[props.cmpType]
}
