import { LongTxt } from "../cmps/LongTxt.jsx"
import { MailList } from "../MailCmps/MailList.jsx"
import { MailDetails } from "../MailCmps/MailDetails.jsx"
import { MailFilter } from "../MailCmps/MailFilter.jsx"
import { MailFolderList } from "../MailCmps/MailFolderList.jsx"
import { MailCompose } from "../MailCmps/MailCompose.jsx"
import { MailService } from "../services/mail.service"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        loadBooks()
    }, [])

    function loadMails() {
        MailService.query()
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }

    
    return (
        <section>
      <div>mail app</div>
        <MailList mails={mails}/>
        {/* <MailDetails /> */}
        {/* <MailFilter /> */}
        {/* <MailFolderList /> */}
        {/* <MailCompose /> */}
        </section>
    )
}

