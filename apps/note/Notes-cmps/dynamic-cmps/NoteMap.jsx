export function NoteMap({ info: {lng, lat, locationName} }) {
    const loc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`

    return (
        <iframe src={loc}></iframe>
    )
}
