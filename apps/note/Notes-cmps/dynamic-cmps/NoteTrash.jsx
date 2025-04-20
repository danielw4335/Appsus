import { noteService } from "../services/note.service.js"
import { NoteList } from "../Notes-cmps/NoteList.jsx"

const { useEffect, useState } = React

export function NoteTrash() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.query().then(notes => {
      const trashed = notes.filter(note => note.isTrashed)
      setNotes(trashed)
    })
  }
  function onRestoreNote(note) {
    const restoredNote = { ...note, isTrashed: false }
    noteService.update(restoredNote).then(loadNotes)
  }

  return (
    <section className="note-trash">
      <h2>🗑️ Trashed Notes</h2>
      <NoteList notes={notes} onRestoreNote={onRestoreNote}  />
    </section>
  )
}
