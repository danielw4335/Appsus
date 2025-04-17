import { NoteTxt } from "./dynamic-cmps/NoteTxt.jsx"
import { NoteImg } from "./dynamic-cmps/NoteImg.jsx"
import { NoteTodos } from "./dynamic-cmps/NoteTodos.jsx"
import { NoteVideo } from "./dynamic-cmps/NoteVideo.jsx"

export function NotePreview({ note }) {

  const cmpMap = {
    NoteTxt,
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
    </section>
  )
}
