import { MailService } from "../services/mail.service"

const { useState, useEffect } = React

export function MailPreview({ mail, onMarkAsRead, onDeleteMail, onSelectMail }) {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        setInfos()
    }, [mail])

    function setInfos() {
        const newInfo = getInfo(mail)
        setInfo(newInfo)
    }

    function getInfo(infos) {
        const { from, to, subject, body, sentAt, status } = infos

        let text = body
        const displayText = (typeof text === 'string')
            ? (text.length <= 100
                ? text
                : text.substring(0, 20))
            : ''

        return {
            sub: subject,
            name: status === 'sent' ? `To: ${to}` : from.substring(0, from.indexOf('@')),
            date: formatDate(sentAt),
            txt: displayText
        }
    }

    function formatDate(timestamp) {
        const now = new Date()
        const date = new Date(timestamp)
        const diffInMs = now - date
        const diffInHours = diffInMs / (1000 * 60 * 60)

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        }

        const diffInDays = diffInHours / 24
        if (diffInDays < 365) {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })
        }

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        })
    }

    if (!info) return <div>Loading...</div>

    const { name, sub, txt, date } = info

    return (
        <div
            className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}
            onClick={(event) => {
                onMarkAsRead(mail.id, event)
                onSelectMail(mail, event)
            }}
        >
            <div className="box-font">
                <a className="fa-regular fa-square"></a>
{/* <a className="fa-regular fa-star"></a> */}
                {/* <a className="fa-regular fa-square-check"></a> */}
                {/* <a className="fa-solid fa-star"></a> */}
                {/* <a className="fa-regular fa-tag"></a> */}
                {/* <a className="fa-solid fa-tag"></a> */}
            </div>

            <p className="pre-from">{name}</p>
            <p className="pre-sub">{sub}</p>
            <p className="pre-body">-{txt}</p>
            <p className="pre-time">{date}</p>

            <div className="box-font-after">
                <a
                    className="fa-regular fa-trash-can"
                    onClick={(event) => onDeleteMail(mail.id, event)}
                ></a>
            </div>
        </div>
    )
}
