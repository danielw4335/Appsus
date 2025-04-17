import { NoteTxt } from "./dynamic-cmps/NoteTxt.jsx"
import { NoteImg } from "./dynamic-cmps/NoteImg.jsx"

export function NotePreview({ note }) {
  const cmpMap = {
    NoteTxt,
    NoteImg,
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
