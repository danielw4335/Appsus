export function NoteAudio({ info }) {
  return (
    <section className="note-audio">
      <audio controls src={info.url}></audio>
      {info.txt && <p>{info.txt}</p>}
    </section>
  )
}
