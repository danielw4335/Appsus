import { NoteTxt } from "./dynamic-cmps/NoteTxt.jsx"
import { NoteImg } from "./dynamic-cmps/NoteImg.jsx"
import { NoteTodos } from "./dynamic-cmps/NoteTodos.jsx"
import { NoteVideo } from "./dynamic-cmps/NoteVideo.jsx"

import { noteService } from "../services/note.service.js"
import { NoteIndex } from "../pages/NoteIndex.jsx"

const { useState } = React
export function NotePreview({
  note,
  onDeleteNote,
  onDuplicateNote,
  onTogglePin,
  onChangeColor,
}) {
  const cmpMap = {
    NoteTxt: NoteTxt,
    NoteImg,
    NoteTodos,
    NoteVideo,
  }
  const DynamicCmp = cmpMap[note.type]
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  return (
    <section
      className="note-preview"
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      <DynamicCmp info={note.info} />
      {isPickerOpen && (
        <div className="color-picker">
          {["#fdd", "#fdfd96", "#caffbf", "#a0c4ff", "#d0bfff"].map((color) => (
            <button
              key={color}
              className="color-btn"
              style={{ backgroundColor: color }}
              onClick={() => {
                onChangeColor(note, color)
                setIsPickerOpen(false) // לסגור את התפריט אחרי בחירה
              }}
            ></button>
          ))}
        </div>
      )}

      <button onClick={() => onDeleteNote(note)}>
        <a className="fa-solid fa-trash"></a>
      </button>
      <button onClick={() => onDuplicateNote(note)}>
        <a className="fa-solid fa-copy"></a>
      </button>
      <button onClick={() => onTogglePin(note)}>
        <a className="fa-solid fa-thumbtack"></a>
      </button>
      <button onClick={() => setIsPickerOpen((prev) => !prev)}>
        <a className="fa-solid fa-palette"></a>
      </button>
    </section>
  )
}
