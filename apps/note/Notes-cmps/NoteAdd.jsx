import { utilService } from "../../../services/util.service.js"
const { useState } = React

export function NoteAdd({ onAddNote }) {
  const [txt, setTxt] = useState("")
  const [noteType, setNoteType] = useState("NoteTxt")
  const [url, setUrl] = useState("")
  const [todosTxt, setTodosTxt] = useState("")
  const [imgFile, setImgFile] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)

  function onAdd(ev) {

    ev.preventDefault()
    let note
    if (noteType === "NoteTxt") {
      note = {
        id: utilService.makeId(),
        type: "NoteTxt",
        info: { txt },
        style: { backgroundColor: "#fff" },
        isPinned: false,
      }
    }
    if (noteType === "NoteVideo" && url) {
      note = {
        id: utilService.makeId(),
        type: "NoteVideo",
        info: {
          url,
          title: "YouTube Video",
          txt,
        },
        style: { backgroundColor: "#fff" },
        isPinned: false,
      }
    }

    if (noteType === "NoteImg") {
      note = {
        id: utilService.makeId(),
        type: "NoteImg",
        info: {
          url: URL.createObjectURL(imgFile),
          title: imgFile.name || "My image",
          txt,
        },
        style: { backgroundColor: "#fff" },
        isPinned: false,
      }
    }

    if (noteType === "NoteTodos") {
      console.log("todosTxt:", todosTxt)
      note = {
        id: utilService.makeId(),
        type: "NoteTodos",
        info: {
          todos: todosTxt.split(",").map((txt) => ({ txt, doneAt: null })),
          txt,
        },
        style: { backgroundColor: "#fff" },
        isPinned: false,
      }
    }
    if (noteType === "NoteMap") {
      note = {
        id: utilService.makeId(),
        type: "NoteMap",
        info: {
          lng: 34.7818,
          lat: 32.0853,
          txt,
        },
        style: { backgroundColor: "#fff" },
        isPinned: false,
      }
    }
    if (noteType === "NoteCanvas") {
      note = {
        id: utilService.makeId(),
        type: "NoteCanvas",
        info: txt,
        style: { backgroundColor: "#fff" },
        isPinned: false,
      }
    }
    if (noteType === "NoteAudio") {
      note = {
        id: utilService.makeId(),
        type: "NoteAudio",
        info: {
          url: URL.createObjectURL(audioFile),
          title: audioFile.name || "My adio",
          txt,
        },
        style: { backgroundColor: "#fff" },
        isPinned: false,
      }
    }

    if (!note) return
    onAddNote(note)
    setTxt("")
    setUrl("")
    setTodosTxt("")
    setImgFile(null)
    setAudioFile(null)
  }

  function handleImgUpload(ev) {
    const file = ev.target.files[0]
    setImgFile(file)
  }

  function handleAudioUpload(ev) {
    const file = ev.target.files[0]
    setAudioFile(file)
  }

  return (
    <section>
      <form onSubmit={onAdd} >
        <input
          type="text"
          value={txt}
          onChange={(ev) => setTxt(ev.target.value)}
          placeholder="Write something.."
        />

        {noteType === "NoteImg" && (
          <input type="file" accept="image/*" onChange={handleImgUpload} />
        )}

        {noteType === "NoteVideo" && (
          <input
            type="text"
            placeholder="Paste YouTube URL"
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
          />
        )}

        {noteType === "NoteCanvas" && <p>Canvas note will be created</p>}

        {noteType === "NoteAudio" && (
          <input type="file" accept="audio/*" onChange={handleAudioUpload} />
        )}

        {noteType === "NoteTodos" && (
          <input
            type="text"
            placeholder="Enter comma-separated tasks"
            value={todosTxt}
            onChange={(ev) => setTodosTxt(ev.target.value)}
          />
        )}

        <div className="note-type-btns">
          <button type="button" onClick={() => setNoteType("NoteTxt")}  title="txt">
            <i className="fa-solid fa-font"></i>
          </button>
          <button type="button" onClick={() => setNoteType("NoteImg")} title="Img">
            <i className="fa-regular fa-image"></i>
          </button>
          <button type="button" onClick={() => setNoteType("NoteVideo")} title="Video">
            <i className="fa-brands fa-youtube"></i>
          </button>
          <button type="button" onClick={() => setNoteType("NoteTodos")} title="Todo">
            <i className="fa-solid fa-list"></i>
          </button>
          <button type="button" onClick={() => setNoteType("NoteAudio")} title="Audio">
            <i className="fa-solid fa-volume-up"></i>
          </button>
          <button type="button" onClick={() => setNoteType("NoteCanvas")} title="Canvas"> 
            <i className="fa-solid fa-paintbrush"></i>
          </button>
          <button type="submit" style={{display: 'none'}}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </section>
  )
}
