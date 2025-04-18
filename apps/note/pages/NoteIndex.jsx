// import { useNotes } from "../Notes-cmps/custom-hooks/useNotes.js"
import { NoteList } from "../Notes-cmps/NoteList.jsx"
import { NoteAdd } from "../Notes-cmps/NoteAdd.jsx"
import { NoteFilter } from "../Notes-cmps/dynamic-cmps/NoteFilter.jsx"
import { NoteAudio } from "../Notes-cmps/dynamic-cmps/NoteAudio.jsx"

import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState({ txt: "", type: "all" })

  // const notes = useNotes()

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
    noteService.remove(note.id).then(loadNotes)
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
    return notes.filter((note) => {
      const matchText =
        filterBy.txt === "" ||
        (note.info.txt &&
          note.info.txt.toLowerCase().includes(filterBy.txt.toLowerCase()))

      const matchType =
        filterBy.type === "all" ||
        note.type.toLowerCase().includes(filterBy.type.toLowerCase())

      return matchText && matchType
    })
  }

  if (!notes) return <div>Loading notes...</div>
  const filteredNotes = getFilteredNotes(notes, filterBy)
  return (
    <section className="note-index">
      <aside className="side-nav">
        <ul>
          <li>
            <i className="fa-regular fa-lightbulb"></i> Notes
          </li>
          <li>
            <i className="fa-regular fa-bell"></i> Reminders
          </li>
          <li>
            <i className="fa-regular fa-pen-to-square"></i> Edit Labels
          </li>
          <li>
            <i className="fa-regular fa-box-archive"></i> Archive
          </li>
          <li>
            <i className="fa-regular fa-trash-can"></i> Trash
          </li>
        </ul>
      </aside>
      <section className="main">
        <div className="top-bar">
          <NoteAdd onAddNote={onAddNote} />
          <NoteFilter onSetFilter={setFilterBy} />
        </div>

        {/* Main Content  */}
        <section className="main-content">
          {filteredNotes.some((note) => note.isPinned) && (
          <section className="pinned-notes">
              <h2>Pinned</h2>
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
            <h2>Others</h2>
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
