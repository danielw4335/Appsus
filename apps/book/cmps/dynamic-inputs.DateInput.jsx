export function DateInput({ date, onSetInput }) {
    
    function onSetDate({ target }) {
        onSetInput({ [target.name]: target.value })
    }

    return (
        <label>
            Date
            <input
                type="date"
                name="date"
                value={date}
                onChange={onSetDate}
            />
            <button>Add</button>
        </label>
    )
}
