const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { BookIndex } from "./apps/book/pages/BookIndex.jsx"
import { NoteTrash } from "./apps/note/Notes-cmps/dynamic-cmps/NoteTrash.jsx"
import { NoteArchive } from "./apps/note/pages/NoteArchive.jsx"
import { NoteRemainder } from "./apps/note/pages/NoteRemainder.jsx"
import { NoteEditLabel } from "./apps/note/pages/NoteEditLabel.jsx"
import { BookDetails } from './apps/book/pages/BookDetails.jsx'

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/books" element={<BookIndex />} />
                <Route path="/books/:bookId" element={<BookDetails />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />

                <Route path="/note/trash" element={<NoteTrash />} />
                <Route path="/note/archive" element={<NoteArchive />} />
                <Route path="/note/remainder" element={<NoteRemainder />} />
                <Route path="/note/edit-labels" element={<NoteEditLabel />} />
            </Routes>
        </section>
    </Router>
}

