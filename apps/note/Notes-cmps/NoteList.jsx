import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onDeleteNote }) {
  return (
    <section className="note-list">
      {notes.map((note) => (
        <NotePreview key={note.id} note={note} onDeleteNote={onDeleteNote} />
      ))}
    </section>
  )
}