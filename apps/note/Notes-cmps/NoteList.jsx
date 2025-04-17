import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes }) {
  return (
    <section className="note-list">
      <div>note list</div>
      {notes.map((note) => (
        <NotePreview key={note.id} note={note} />
      ))}
    </section>
  )
}

// export function NoteList({ notes }) {
//     console.log(notes);
//     return (
//         <section className="note-list">
//             {notes.map(note => (
//                 <div key={note.id} className="note-preview">
//                     <h4>Type: {note.type}</h4>
//                     {note.type === 'NoteTxt' && <p>{note.info.txt}</p>}
//                     {note.type === 'NoteImg' && <img src={note.info.url} alt="note" />}
//                     {note.type === 'NoteTodos' && (
//                         <ul>
//                             {note.info.todos.map((todo, idx) => (
//                                 <li key={idx}>{todo.txt}</li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             ))}
//         </section>
//     )
// }
