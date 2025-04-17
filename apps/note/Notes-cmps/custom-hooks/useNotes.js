import { noteService } from "../../services/note.service.js"


const {useState, useEffect} = React

export function useNotes(){
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        console.log('Running useEffect')
        noteService.query().then(setNotes)
    }, [])
    return notes
}