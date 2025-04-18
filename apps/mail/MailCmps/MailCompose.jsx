


export function MailCompose({ onClose }) {
    return (
      <section className="mail-compose">
        <button className="close-compose" onClick={onClose}>X</button>
        <form action="">

<input type="email" name="Recipients" value={a} />

<input type="text" name="Subject" value={a} />

<input type="text" value={a} />
<button className="fil-btn">Send</button>
        </form>
      </section>
    )
  }
