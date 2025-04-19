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
    const [mailCountByStatus, setMailCountByStatus] = useState({})
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
                resOfstatus() 
                setMails(mails)
            }).catch(err => console.error('Failed to load', err))
    }

    function resOfstatus() {
           let mails = MailService.getMails()
          const result = mails.reduce((acc, mail) => {
            const status = mail.status || 'unknown'
            acc[status] = (acc[status] || 0) + 1
            return acc
        }, {})
        // console.log(result)
        setMailCountByStatus(result)
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function onSetIsComposing() {
        setIsComposing(true)
    }




    const loadingClass = isLoading ? 'loading' : ''
    return (

        <section className="main-body-mail">
            {/* <MailDetails /> */}
            <MailFilter
                onSetFilterBy={onSetFilterBy}
                filterBy={filterBy}
                onSetIsComposing={onSetIsComposing}
            />
            <div className="mail-body">
                <MailFolderList
                mailCountByStatus={mailCountByStatus}
                    onSetFilterBy={onSetFilterBy}/>
                    
                <MailList
                    mails={mails}
                    loadingClass={loadingClass}
                    onReload={loadMails} />
            </div>

            {isComposing && (
                <MailCompose
                    loadMails={loadMails}
                    onClose={() => setIsComposing(false)} />
            )}

        </section>
    )
}
