import { bookService } from "../services/book.service.js"
import { utilService } from '../services/util.service.js'


const { useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

const { useState } = React

export function BookEdit() {


    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()
    // console.log(bookId);

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => console.log('err:', err))
    }


    function handleChange({ target }) {

        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prev => {
            if (field === 'amount') {
                return {
                    ...prev,
                    listPrice: {
                        ...prev.listPrice, amount: value
                    }
                }
            }
            return {
                ...prev, [field]: value
            }
        })
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(() => {
                navigate('/books')
                showSuccessMsg('you add book')
            })
            .catch(err => {
                console.log('Cannot save book!:', err)
                showErrorMsg('Cannot save book!')
            })
    }

    const loadingClass = isLoading ? 'loading' : ''
    const { title, listPrice, isOnSale, thumbnail } = bookToEdit
// console.log(bookToEdit);

    return (
        <section className={"book-edit " + loadingClass}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="price">Price</label>
                <input value={listPrice.amount} onChange={handleChange} type="number" name="amount" id="amount" />

                <label htmlFor="thumbnail">Img</label>
                <input value={thumbnail} onChange={handleChange} type="text" name="thumbnail" id="thumbnail" />

                <div>
                    <button>Save</button>
                    <button type="button">
                        <Link to='/books'>Back</Link>
                    </button>
                </div>
            </form>
        </section>
    )
}


