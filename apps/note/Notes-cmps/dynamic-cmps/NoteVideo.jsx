export function NoteVideo({ info: { url, title } }) {
  return (
    <section className="note-video">
      <iframe
        width="300"
        height="180"
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  )
}
