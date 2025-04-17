// note service

export const noteService = {
    query
}

const gNotes = [
    {
        id: 'n101',
        type: 'NoteTxt',
        info: { txt: 'Fullstack Me Baby!' },
        style: { backgroundColor: '#fdd' },
        isPinned: true
    }
]

function query() {
    return Promise.resolve(gNotes)
}
