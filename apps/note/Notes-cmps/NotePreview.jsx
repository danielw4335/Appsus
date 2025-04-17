import { NoteTxt } from "./dynamic-cmps/NoteTxt.jsx"
import { NoteImg } from "./dynamic-cmps/NoteImg.jsx"
import { NoteTodos } from "./dynamic-cmps/NoteTodos.jsx"
import { NoteVideo } from "./dynamic-cmps/NoteVideo.jsx"

import { noteService } from "../services/note.service.js"
import { NoteIndex } from "../pages/NoteIndex.jsx"

export function NotePreview({ note, onDeleteNote, onDuplicateNote, onTogglePin }) {
  const cmpMap = {
    NoteTxt: NoteTxt,
    NoteImg,
    NoteTodos,
    NoteVideo,
  }
  const DynamicCmp = cmpMap[note.type]

  return (
    <section
      className="note-preview"
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      <DynamicCmp info={note.info} />
      <button onClick={() => onDeleteNote(note)}>
        <a className="fa-solid fa-trash"></a>
      </button>
      <button onClick={() => onDuplicateNote(note)}>
        <i className="fa-solid fa-copy"></i>
      </button>
      <button onClick={() => onTogglePin(note)}>
        <i className="fa-solid fa-thumbtack"></i>
      </button>
    </section>
  )
}
