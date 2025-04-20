import { MailPreview } from "../MailCmps/MailPreview.jsx"
import { MailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailList({ mails, loadingClass, onReload, onSelectMail }) {

    function onMarkAsRead(mailId, ev) {
        ev.stopPropagation()
        MailService.markAsRead(mailId).then(onReload)
    }

    function onDeleteMail(mailId, ev) {
        ev.stopPropagation()
        MailService.deleteMail(mailId).then(onReload)
    }

    function onToggleStar(mailId) {
        MailService.toggleStar(mailId).then(onReload)
    }

    function onToggleRead(mailId, ev) {
        ev.stopPropagation()
        MailService.toggleRead(mailId).then(onReload)
    }

    if (!mails || !mails.length) return <div>No Mails To Show...</div>

    return (
        <ul className="mail-list container">
            {mails.map(mail => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    className={loadingClass}
                    onMarkAsRead={onMarkAsRead}
                    onDeleteMail={onDeleteMail}
                    onSelectMail={onSelectMail}
                    onToggleStar={onToggleStar}
                    onToggleRead={onToggleRead}
                />
            ))}
        </ul>
    )
}
