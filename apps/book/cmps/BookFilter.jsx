const { useState, useEffect } = React
const { Link } = ReactRouterDOM


export function BookFilter({ filterBy, onSetFilterBy }) {
    console.log(filterBy, onSetFilterBy);

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // function handleChangeShortVersion({ target }) {
    //     const field = target.name
    //     let value = target.type === 'number' ? +target.value : target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

    /* 
    function handleTxtChange({ target }) {
        const value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    }

    function handleMinSpeedChange({ target }) {
        const value = +target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    }
    */

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { title, minPrice } = filterByToEdit
    // console.log('title:', title)
    // console.log('minPrice:', minPrice)
    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">title</label>
                <input onChange={handleChange} value={title} name="title" id="title" type="text" />

                <label htmlFor="minPrice">Min Price</label>
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number" />

                <label htmlFor="pageCount">Min Pages Count: {filterByToEdit.pageCount || 0}</label>
                <input onChange={handleChange} type="range" name="pageCount" id="pageCount" min="0" max="1000" step="10" value={filterByToEdit.pageCount || 0} />

                <label htmlFor="minPublicationYear">Published year</label>
                <input onChange={handleChange} type="number" name="minPublicationYear" id="minPublicationYear" min="1900" max={new Date().getFullYear()} value={filterByToEdit.minPublicationYear || 1900} />
                <button className="fil-btn">Submit</button>
                <button className="fil-btn">
                    <Link to={'/books/add'}>Add books</Link>
                </button>
            </form>
        </section>
    )
}

