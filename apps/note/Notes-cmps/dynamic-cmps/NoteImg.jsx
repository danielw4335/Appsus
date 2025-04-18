export function NoteImg({ info }) {
  return (
    <section className="note-img">
      <img src={info.url} alt={info.title} />
      {(info.txt || info.title) && <p>{info.txt || info.title}</p>}
    </section>
  )
}
