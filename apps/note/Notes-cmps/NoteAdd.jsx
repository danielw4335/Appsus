import {utilService} from '../../../services/util.service.js'
const { useState } = React



export function NoteAdd({ onAddNote }) {
  const [txt, setTxt] = useState("")

  function onAdd(ev) {
    ev.preventDefault()

    const note = {
        id: utilService.makeId(),
        type: 'NoteTxt',
        info: {txt},
        style: {backgroundColor: '#fff'},
        isPinned: false,
    }
    onAddNote(note)
    setTxt('')
  }

  return (
    <section>
      <form onSubmit={onAdd}>
        <input type="text" value={txt} onChange={(ev) => setTxt(ev.target.value)} />
      </form>
    </section>
  )
}
