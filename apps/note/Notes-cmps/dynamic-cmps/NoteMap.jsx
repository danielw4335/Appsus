
export function NoteMap({ info: {lng, lat, locationName} }) {
const loc = 'https://maps.google.com/maps?q=32.0853,34.7818&z=15&output=embed'

    return (
        <iframe src={loc}></iframe>
    )
}
