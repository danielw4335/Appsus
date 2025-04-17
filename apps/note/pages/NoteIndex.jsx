import { useNotes } from '../Notes-cmps/custom-hooks/useNotes.js'
import { NoteList } from '../Notes-cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const {useState, useEffect} = React

export function NoteIndex() {
    const notes = useNotes()
    
    if (!notes) return <div>Loading notes...</div>
    return (
        <section>
            <NoteList />
        <div>note app</div>
        </section>
    )
}
