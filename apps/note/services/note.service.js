import { utilService } from "../../../services/util.service.js"

const STORAGE_KEY = "notesDB"

export const noteService = {
  query,
  add,
  remove,
  update,
}

let gNotes = _loadNotes()

function query() {
  gNotes = _loadNotes()
  return Promise.resolve(gNotes)
}


function _loadNotes() {
  const notesFromStorage = utilService.loadFromStorage(STORAGE_KEY)
  if (notesFromStorage) return notesFromStorage

  return [
    {
      id: utilService.makeId(),
      type: "NoteTxt",
      info: { txt: "Fullstack Me Baby!" },
      style: { backgroundColor: "#fdd" },
      isPinned: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteImg",
      info: {
        url: "assets/img/FatherSonKamehameha.jpg",
        title: "Kamehameha",
      },
      style: { backgroundColor: "#e6f7ff" },
      isPinned: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteVideo",
      info: {
        url: "https://www.youtube.com/embed/lTRiuFIWV54",
        title: "Lofi Girl",
      },
      style: { backgroundColor: "#e6f7ff" },
      isPinned: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteTodos",
      info: {
        todos: [
          { txt: "Buy milk", doneAt: null },
          { txt: "Watch One Piece", doneAt: 1680000000000 },
        ],
      },
      style: { backgroundColor: "#e0f7fa" },
      isPinned: false,
    },
  ]
}

function add(note) {
  gNotes.unshift(note)
  utilService.saveToStorage(STORAGE_KEY, gNotes)
  return Promise.resolve()
}

function remove(noteId) {
  const idx = gNotes.findIndex(note => note.id === noteId)
  if (idx !== -1) {
    gNotes.splice(idx, 1)
    utilService.saveToStorage(STORAGE_KEY, gNotes)
  }
  return Promise.resolve()
}

function update(noteToUpdate){
  const idx = gNotes.findIndex(note => note.id === noteToUpdate.id)
  if (idx !== -1){
    gNotes[idx] = noteToUpdate
    utilService.saveToStorage(STORAGE_KEY, gNotes)
  }
  return Promise.resolve()
}