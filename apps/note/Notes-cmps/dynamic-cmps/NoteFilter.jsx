const { useState } = React

export function NoteFilter({ onSetFilter }) {
  const [filterBy, setFilterBy] = useState({ txt: "", type: "all" })

  return (
    <section className="note-filter">
      <input
        placeholder="Filter by type and text"
        type="text"
        value={filterBy.txt}
        onChange={(ev) => {
          const newFilter = { ...filterBy, txt: ev.target.value }
          setFilterBy(newFilter)
          onSetFilter(newFilter)
        }}
      />
      <select
        className="select-filter"
        value={filterBy.type}
        onChange={(ev) => {
          const newFilter = { ...filterBy, type: ev.target.value }
          setFilterBy(newFilter)
          onSetFilter(newFilter)
        }}
      >
        <option value="all">All</option>
        <option value="NoteTxt">Text</option>
        <option value="NoteImg">Image</option>
        <option value="NoteVideo">Video</option>
        <option value="NoteTodos">Todos</option>
      </select>
    </section>
  )
}
