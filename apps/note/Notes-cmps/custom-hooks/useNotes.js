import { noteService } from "../../services/note.service.js"


const {useState, useEffect} = React

export function useNotes(){
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query().then(setNotes)
    }, [])
    return notes
}