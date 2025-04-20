import { NoteTxt } from "./dynamic-cmps/NoteTxt.jsx"
import { NoteImg } from "./dynamic-cmps/NoteImg.jsx"
import { NoteTodos } from "./dynamic-cmps/NoteTodos.jsx"
import { NoteVideo } from "./dynamic-cmps/NoteVideo.jsx"
import { NoteCanvas } from "./dynamic-cmps/NoteCanvas.jsx"
import { NoteAudio } from "./dynamic-cmps/NoteAudio.jsx"
import { NoteMap } from "./dynamic-cmps/NoteMap.jsx"


const { useState } = React
const { useNavigate } = ReactRouterDOM
export function NotePreview({
  note,
  onDeleteNote,
  onDuplicateNote,
  onTogglePin,
  onChangeColor,
  onAddNote,
  onRestoreNote,
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
      <div className="btns-note">
        {onRestoreNote && note.isTrashed && (
          <button onClick={() => onRestoreNote(note)} title="Restore">
            <i className="fa-solid fa-rotate-left note-btn"></i>
          </button>
        )}

        <button onClick={() => onDeleteNote(note)} title="Delete">
          <a className="fa-solid fa-trash note-btn"></a>
        </button>

        <button onClick={() => onDuplicateNote(note)} title="Duplicate">
          <a className="fa-solid fa-copy note-btn"></a>
        </button>

        <button
          onClick={() => onTogglePin(note)}
          title="Pin"
          className={note.isPinned ? "pin-btn pinned" : "pin-btn"}
        >
          <a className="fa-solid fa-thumbtack note-btn"></a>
        </button>

        <button onClick={() => setIsPickerOpen((prev) => !prev)} title="Color">
          <a className="fa-solid fa-palette note-btn"></a>
        </button>

        <button onClick={onSendToMail} title="Send">
          <a className="fa-solid fa-envelope note-btn"></a>
        </button>
      </div>
    </section>
  )
}
