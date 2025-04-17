// import { useNotes } from "../Notes-cmps/custom-hooks/useNotes.js"
import { NoteList } from "../Notes-cmps/NoteList.jsx"
import { NoteAdd } from "../Notes-cmps/NoteAdd.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  // const notes = useNotes()

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.query().then(notes => {
      console.log('Loaded after delete:', notes)
      setNotes(notes)
    })
  }
  
  function onAddNote(note) {
    noteService.add(note).then(loadNotes)
  }

  function onDeleteNote(note) {
    noteService.remove(note.id).then(loadNotes)
  }

  if (!notes) return <div>Loading notes...</div>
  return (
    <section className="note-index">
    
      <NoteAdd onAddNote={onAddNote} />
      <NoteList notes={notes} onDeleteNote={onDeleteNote} />
      <div>note app</div>
    </section>
  )
}
