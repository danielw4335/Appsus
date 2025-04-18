import { LongTxt } from "../cmps/LongTxt.jsx"
import { MailList } from "../MailCmps/MailList.jsx"
import { MailDetails } from "../MailCmps/MailDetails.jsx"
import { MailFilter } from "../MailCmps/MailFilter.jsx"
import { MailFolderList } from "../MailCmps/MailFolderList.jsx"
import { MailCompose } from "../MailCmps/MailCompose.jsx"
import { MailService } from "../services/mail.service.js"
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(MailService.getFilterFromSearchParams(searchParams))
    const [isComposing, setIsComposing] = useState(false)



    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        MailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            }).catch(err => console.error('Failed to load', err))
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }




    const loadingClass = isLoading ? 'loading' : ''
    return (

        <section>
            <button className="compose-btn" onClick={() => setIsComposing(true)}>
                Compose
            </button>
            {/* <MailDetails /> */}
            <MailFilter
                onSetFilterBy={onSetFilterBy}
                filterBy={filterBy}
            />
            <MailFolderList />
            {/* <MailCompose /> */}
            <MailList
                mails={mails}
                loadingClass={loadingClass}
                onReload={loadMails}
            />

{isComposing && (
  <MailCompose onClose={() => setIsComposing(false)} />
)}

        </section>
    )
}
