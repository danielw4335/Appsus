import { LongTxt } from "../cmps/LongTxt.jsx"
import { MailList } from "../MailCmps/MailList.jsx"
import { MailDetails } from "../MailCmps/MailDetails.jsx"
import { MailFilter } from "../MailCmps/MailFilter.jsx"
import { MailFolderList } from "../MailCmps/MailFolderList.jsx"
import { MailCompose } from "../MailCmps/MailCompose.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        loadMails()
        console.log('useEffect');
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
                console.log('set mails', mails);

            })
            .catch(err => console.log('err:', err))
    }

   
    const loadingClass = isLoading ? 'loading' : ''
    return (

        <section>
            {console.log('render index')}
            <div>mail app</div>
            {/* <MailDetails /> */}
            {/* <MailFilter /> */}
            {/* <MailFolderList /> */}
            {/* <MailCompose /> */}
                    <MailList 
                    mails={mails} 
                    loadingClass={loadingClass}
                    />
    
        </section>
    )
}
