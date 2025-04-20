export function NameInput({ name, onSetInput }) {
    function onSetName({ target }) {
        onSetInput({ [target.name]: target.value })
    }

    return (
        <label>
            Full name:
            <input
                type="text"
                name="fullname"
                value={name}
                onChange={onSetName}
                required
            />
        </label>
    )
}
