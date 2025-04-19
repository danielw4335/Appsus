import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onDeleteNote, onDuplicateNote,onChangeColor, onTogglePin, onAddNote }) {
  // const sortedNotes = [...notes].sort((a, b) => {
  //   return (b.isPinned === true) - (a.isPinned === true)
  // })
  const validNotes = notes.filter(note => note)
  const sortedNotes = validNotes.sort((a, b) => b.isPinned - a.isPinned)
  

  return (
    <section className="note-list">
      {sortedNotes.map((note) => (
        <NotePreview
          key={note.id}
          note={note}
          onDeleteNote={onDeleteNote}
          onDuplicateNote={onDuplicateNote}
          onTogglePin={onTogglePin}
          onChangeColor={onChangeColor}
          onAddNote={onAddNote}
        />
      ))}
    </section>
  )
}
