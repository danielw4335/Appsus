// MailFilter.jsx
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailFilter({ filterBy, onSetFilterBy, sortField, sortOrder, onToggleSort }) {
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

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt } = filterByToEdit

    return (
        <section className="mail-filter container">
       <form onSubmit={onSubmitFilter}>
  <div className="search-bar">
    <i className="fa-solid fa-magnifying-glass"></i>
    <input
      onChange={handleChange}
      value={txt}
      name="txt"
      id="txt"
      type="text"
      placeholder="Search mail"
    />
  </div>
</form>

            <div className="sort-controls">
                <button
                    className={`sort-btn ${sortField === 'date' ? 'active' : ''}`}
                    onClick={() => onToggleSort('date')}
                >
                    Date <i className={`fa-solid fa-chevron-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                </button>

                <button
                    className={`sort-btn ${sortField === 'subject' ? 'active' : ''}`}
                    onClick={() => onToggleSort('subject')}
                >
                    Subject <i className={`fa-solid fa-chevron-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                </button>

                <button
                    className={`sort-btn ${sortField === 'isRead' ? 'active' : ''}`}
                    onClick={() => onToggleSort('isRead')}
                >
                    Read <i className={`fa-solid fa-chevron-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                </button>
            </div>
        </section>
    )
}
