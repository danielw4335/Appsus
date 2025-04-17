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
    id: 'n102',
    type: 'NoteImg',
    info: {
      url: 'assets/img/FatherSonKamehameha.jpg',
      title: 'Kamehameha'
    },
    style: {
      backgroundColor: '#e6f7ff',
    },
    isPinned: false,
  }
]

function query() {
  return Promise.resolve([...gNotes, ...gImgs])
}
