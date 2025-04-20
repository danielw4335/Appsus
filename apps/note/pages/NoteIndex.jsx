// import { useNotes } from "../Notes-cmps/custom-hooks/useNotes.js"
import { NoteList } from "../Notes-cmps/NoteList.jsx"
import { NoteAdd } from "../Notes-cmps/NoteAdd.jsx"
import { NoteFilter } from "../Notes-cmps/dynamic-cmps/NoteFilter.jsx"
import { NoteAudio } from "../Notes-cmps/dynamic-cmps/NoteAudio.jsx"

import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState({ txt: "", type: "all" })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.query().then((notes) => {
      setNotes(notes)
    })
  }

  function onAddNote(note) {
    noteService.add(note).then(loadNotes)
  }

  function onDeleteNote(note) {
    const trashedNote = { ...note, isTrashed: true }
    noteService.update(trashedNote).then(loadNotes)
  }

  function onDuplicateNote(note) {
    const duplicateNote = {
      ...structuredClone(note),
      id: utilService.makeId(),
      isPinned: false,
    }
    noteService.add(duplicateNote).then(loadNotes)
  }

  function onTogglePin(note) {
    const updatedNote = { ...note, isPinned: !note.isPinned }
    noteService.update(updatedNote).then(loadNotes)
  }

  function onChangeColor(note, newColor) {
    const updatedNote = {
      ...note,
      style: { ...note.style, backgroundColor: newColor },
    }
    noteService.update(updatedNote).then(loadNotes)
  }

  function getFilteredNotes(notes, filterBy) {
    return notes
      .filter(note => !note.isTrashed) 
      .filter(note => {
        const txt = filterBy.txt.toLowerCase()
  
        const matchText =
          !txt ||
          (note.info.txt && note.info.txt.toLowerCase().includes(txt)) ||
          (note.info.title && note.info.title.toLowerCase().includes(txt)) ||
          (note.info.todos && note.info.todos.some(todo => todo.txt.toLowerCase().includes(txt)))
  
        const matchType = filterBy.type === "all" || note.type === filterBy.type
  
        return matchText && matchType
      })
  }
  

  if (!notes) return <div>Loading notes...</div>
  const filteredNotes = getFilteredNotes(notes, filterBy)
  return (
    <section className="note-index">
      <button
        className="hamburger-btn"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      <aside className={`side-nav ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li className="li-nav-bar">
            <i className="fa-regular fa-lightbulb"></i> Notes
          </li>
          <li className="li-nav-bar">
            <i className="fa-regular fa-bell"></i> Reminders
          </li>
          <li className="li-nav-bar">
            <i className="fa-regular fa-pen-to-square"></i> Edit Labels
          </li>
          <li className="li-nav-bar">
            <i className="fa-regular fa-box-archive"></i> Archive
          </li>
          <Link to="/note/trash">
            <li>
              <i className="fa-regular fa-trash-can"></i> Trash
            </li>
          </Link>
        </ul>
      </aside>
      
      {isMenuOpen && (
        <div
          className="side-nav-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <section className="main">
        <div className="top-bar">
          <NoteAdd onAddNote={onAddNote} />
          <NoteFilter onSetFilter={setFilterBy} />
        </div>

        {/* Main Content  */}
        <section className="main-content">
          {filteredNotes.some((note) => note.isPinned) && (
            <section className="pinned-notes">
              <h2>Pinned notes:</h2>
              <NoteList
                notes={filteredNotes.filter((note) => note.isPinned)}
                onDeleteNote={onDeleteNote}
                onDuplicateNote={onDuplicateNote}
                onTogglePin={onTogglePin}
                onChangeColor={onChangeColor}
                onAddNote={onAddNote}
              />
            </section>
          )}

          {/* other notes  */}
          <section className="other-notes">
            <h2>Notes:</h2>
            <NoteList
              notes={filteredNotes.filter((note) => !note.isPinned)}
              onDeleteNote={onDeleteNote}
              onDuplicateNote={onDuplicateNote}
              onTogglePin={onTogglePin}
              onChangeColor={onChangeColor}
              onAddNote={onAddNote}
            />
          </section>
        </section>
      </section>
    </section>
  )
}
