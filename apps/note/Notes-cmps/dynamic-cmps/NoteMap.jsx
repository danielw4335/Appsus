
export function NoteMap({ info }) {
  const { lat, lng, txt } = info
  const loc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`

  return (
    <section className="note-map">
      <iframe src={loc}></iframe>
      {(info.txt || info.title) && <p>{info.txt || info.title}</p>}
    </section>
  )
}
