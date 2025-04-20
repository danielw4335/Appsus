const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailFilter({ filterBy, onSetFilterBy, onSetIsComposing}) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    
    useEffect(() => {
        if (JSON.stringify(filterByToEdit) !== JSON.stringify(filterBy)) {
            onSetFilterBy(filterByToEdit);
        }
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

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }));
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }


    const { status, txt, isRead, isStared, lables } = filterByToEdit

    return (
        <section className="mail-filter container">

<a className="fa-solid fa-pencil compose-btn" onClick={() => onSetIsComposing(true)}></a>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt"></label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text"
                    placeholder="Search mail" />
                    
                {/* <label htmlFor="minPrice">Min Price</label>
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number" />

                <label htmlFor="pageCount">Min Pages Count: {filterByToEdit.pageCount || 0}</label>
                <input onChange={handleChange} type="range" name="pageCount" id="pageCount" min="0" max="1000" step="10" value={filterByToEdit.pageCount || 0} />

                <label htmlFor="minPublicationYear">Published year</label>
                <input onChange={handleChange} type="number" name="minPublicationYear" id="minPublicationYear" min="1900" max={new Date().getFullYear()} value={filterByToEdit.minPublicationYear || 1900} />
                <Link to={'/books/add'}>Add books</Link> */}
                {/* <button className="fil-btn">Submit</button> */}
            </form>
        </section>
    )

}

