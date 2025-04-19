import { NoteTxt } from "./dynamic-cmps/NoteTxt.jsx"
import { NoteImg } from "./dynamic-cmps/NoteImg.jsx"
import { NoteTodos } from "./dynamic-cmps/NoteTodos.jsx"
import { NoteVideo } from "./dynamic-cmps/NoteVideo.jsx"
import { NoteCanvas } from "./dynamic-cmps/NoteCanvas.jsx"
import { NoteAudio } from "./dynamic-cmps/NoteAudio.jsx"
import { NoteMap } from "./dynamic-cmps/NoteMap.jsx"

import { noteService } from "../services/note.service.js"
import { NoteIndex } from "../pages/NoteIndex.jsx"

const { useState } = React
const { useNavigate } = ReactRouterDOM
export function NotePreview({
  note,
  onDeleteNote,
  onDuplicateNote,
  onTogglePin,
  onChangeColor,
  onAddNote,
}) {
  const cmpMap = {
    NoteTxt: NoteTxt,
    NoteImg,
    NoteTodos,
    NoteVideo,
    NoteCanvas,
    NoteAudio,
    NoteMap,
  }

  const DynamicCmp = cmpMap[note.type]
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const navigate = useNavigate()

  function onSendToMail() {
    let body = ""

    if (note.type === "NoteTxt") {
      body = note.info.txt
    } else if (note.type === "NoteImg") {
      body = `Image: ${note / info.title || ""} - ${note.info.url}`
    } else if (note.type === "NoteTodos") {
      body = note.info.todos.map((todo) => `• ${todo.txt}`).join("\n")
    } else if (note.type === "NoteVideo") {
      body = `Watch: ${note.info.url}`
    } else if (note.type === "NoteCanvas") {
      body = `<img src="${note.info.url}" alt="Canvas drawing">`
    }

    const subject = "Note from Keep"
    const query = `?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    navigate(`/mail/compose${query}`)
  }

  function onSelectNoteType(type) {
    setNoteType(type)
    setTxt('')
    setUrl('')
    setTodosTxt('')
    setImgFile(null)
    setAudioFile(null)
  }
  

  return (
    <section
      className="note-preview"
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      {note.type === "NoteCanvas" ? (
        <NoteCanvas info={note.info} onAddNote={onAddNote} />
      ) : (
        <DynamicCmp info={note.info} />
      )}

      {isPickerOpen && (
        <div className="color-picker">
          {["#fdd", "#fdfd96", "#caffbf", "#a0c4ff", "#d0bfff"].map((color) => (
            <button
              key={color}
              className="color-btn"
              style={{ backgroundColor: color }}
              onClick={() => {
                onChangeColor(note, color)
                setIsPickerOpen(false)
              }}
            ></button>
          ))}
        </div>
      )}
      <div className="bts-note">
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
        <button onClick={onSendToMail}>
          <a className="fa-solid fa-envelope"></a>
        </button>
      </div>
    </section>
  )
}
