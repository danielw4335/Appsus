// note service
import { utilService } from "../../../services/util.service.js"

export const noteService = {
  query,
}

const gNotes = [
  {
    id: "n101",
    type: "NoteTxt",
    info: { txt: "Fullstack Me Baby!" },
    style: { backgroundColor: "#fdd" },
    isPinned: true,
  },
]

const gImgs = [
  {
    id: utilService.makeId(),
    type: "NoteImg",
    info: {
      url: "assets/img/FatherSonKamehameha.jpg",
      title: "Kamehameha",
    },
    style: {
      backgroundColor: "#e6f7ff",
    },
    isPinned: false,
  },
]

const gTodos = [
  {
    id: utilService.makeId(),
    type: "NoteTodos",
    info: {
      todos: [
        { txt: "Buy milk", doneAt: null },
        { txt: "Watch one piece", doneAt: 1680000000000 }
      ]
    },
    style: {
      backgroundColor: "#e0f7fa"
    },
    isPinned: false
  }
  
]

function query() {
  return Promise.resolve([...gNotes, ...gImgs, ...gTodos])
}
