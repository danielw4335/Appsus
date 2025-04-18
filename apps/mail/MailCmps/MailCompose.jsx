import { MailService } from "../services/mail.service.js"


const { useState, useEffect } = React


export function MailCompose({ onClose, loadMails }) {

  const [formData, setFormData] = useState('')

  const  data = {
      mail: '',
        Subject: '',
          body: ''
    }

  useEffect(() => {
    setFormData(data)   
}, [])

  function handleChange(ev) {
    const { name, value } = ev.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function onSubmitSend(ev) {
    ev.preventDefault()
    console.log(formData)
    MailService.addMail(formData)
    onClose()
    loadMails()
  }


  return (
    <section className="mail-compose">
      <div className="header-message">
<p>New message</p>
      <button className="close-compose" onClick={onClose}>X</button>
      </div>
      <form onSubmit={onSubmitSend}>
        <input
        className="input-mail"
          type="email"
          name="mail"
          placeholder="Recipients"
          value={formData.mail}
          onChange={handleChange}
        />

        <input
        className="input-sub"
          type="text"
          name="Subject"
           placeholder="Subject"
          value={formData.Subject}
          onChange={handleChange}
        />

        <input
        className="input-body"
          type="text"
          name="body"
          value={formData.body}
          onChange={handleChange}
        />
<div className="nav-message">
        <button className="fil-btn">Send</button>
</div>
      </form>
    </section>
  )
}
