export function NoteAudio({ info }) {
  return (
    <section className="note-audio">
      <audio controls src={info.url}></audio>
      {(info.txt || info.title) && <p>{info.txt || info.title}</p>}
    </section>
  )
}
