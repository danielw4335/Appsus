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
      isTrashed: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteTxt",
      info: { txt: "Do homework!" },
      style: { backgroundColor: "#fff9c4" },
      isPinned: false,
      isTrashed: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteTxt",
      info: { txt: "Keep smile! 😊" },
      style: { backgroundColor: "#e8eaf6" },
      isPinned: true,
      isTrashed: false,
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
      isTrashed: false,
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
      isTrashed: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteTodos",
      info: {
        title: 'Todos:',
        todos: [
          { txt: "Watch One Piece eposide 1126", doneAt: 1680000000000 },
          { txt: "Buy milk", doneAt: null },
        ],
      },
      style: { backgroundColor: "#e0f7fa" },
      isPinned: true,
      isTrashed: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteTodos",
      info: {
        todos: [
          { txt: "Finish the report", doneAt: 1680500000000 },
          { txt: "Finish the presentation", doneAt: 1745154259304 },
        ],
      },
      style: { backgroundColor: "#dcedc8" },
      isPinned: false,
      isTrashed: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteCanvas",
      info:  {
        title: 'Hello',
        txt: "Canvas",
      },
      style: { backgroundColor: "#e0f7fa" },
      isPinned: false,
      isTrashed: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteAudio",
      info: {
        url: "assets/audio/wow-sound.mp3",
        title: "Wow Sound",
      },
      style: { backgroundColor: "#e0f7fa" },
      isPinned: false,
      isTrashed: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteMap",
      info: {
        title: "Tel-Aviv",
        lng: 34.7818,
        lat: 32.0853,
      },
      style: { backgroundColor: "#e0f7fa" },
      isPinned: false,
      isTrashed: false,
    },
    {
      id: utilService.makeId(),
      type: "NoteMap",
      info: {
        lng: 35.2137,
        lat: 31.7683,
      },
      style: { backgroundColor: "#e1bee7" },
      isPinned: false,
      isTrashed: false,
      title: "Jerusalem",
    },
  ]
}

function add(note) {
  gNotes.unshift(note)
  utilService.saveToStorage(STORAGE_KEY, gNotes)
  return Promise.resolve()
}

function remove(noteId) {
  const idx = gNotes.findIndex((note) => note.id === noteId)
  if (idx !== -1) {
    gNotes.splice(idx, 1)
    utilService.saveToStorage(STORAGE_KEY, gNotes)
  }
  return Promise.resolve()
}

function update(noteToUpdate) {
  const idx = gNotes.findIndex((note) => note.id === noteToUpdate.id)
  if (idx !== -1) {
    gNotes[idx] = noteToUpdate
    utilService.saveToStorage(STORAGE_KEY, gNotes)
  }
  return Promise.resolve()
}
