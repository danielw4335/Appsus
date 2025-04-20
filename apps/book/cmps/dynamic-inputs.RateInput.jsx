export function RateInput({ rate, onSetInput }) {
    
    function onSetRate({ target }) {
        onSetInput({ [target.name]: +target.value })
    }

    return (
        <label>
            Rating
            <select name="rate" value={rate} onChange={onSetRate}>
                {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{'⭐'.repeat(n)}</option>
                ))}
            </select>
            <button>Add</button>
        </label>
    )
}
