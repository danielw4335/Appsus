export function NoteImg({info: {url, title}}){

    return (
        <section className="note-img">

        <img src={url} alt={title}  />
        {title && <p>{title}</p>}
        </section>
    )
}