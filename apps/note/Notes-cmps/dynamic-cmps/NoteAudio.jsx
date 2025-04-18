export function NoteAudio({ info }) {
    return (
      <section className="note-audio">
        <p>{info.title}</p>
        <audio controls>
          <source src={info.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </section>
    )
  }
  