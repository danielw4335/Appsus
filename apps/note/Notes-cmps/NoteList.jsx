import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onDeleteNote, onDuplicateNote, onTogglePin }) {
  const sortedNotes = [...notes].sort((a, b) => {
    return (b.isPinned === true) - (a.isPinned === true)
  })

  return (
    <section className="note-list">
      {sortedNotes.map((note) => (
        <NotePreview
          key={note.id}
          note={note}
          onDeleteNote={onDeleteNote}
          onDuplicateNote={onDuplicateNote}
          onTogglePin={onTogglePin}
        />
      ))}
    </section>
  )
}
