export function MailDetails({ mail, onClose }) {

    function timeToDate() {
        const timestamp = 1745128999882
        const date = new Date(timestamp)
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        
        let hours = date.getHours()
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12
        hours = hours ? hours : 12
        
        const formatted = `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`
        
        const now = new Date()
        const diff = now - date
        const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24))
        
        const time = `${formatted} ${daysAgo ? `(${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago)` : ''}`

        return time
    }

    return (
        <section className="mail-details">
            <header>
                <button className="back-btn" onClick={onClose}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Back
                </button>
            </header>
            <div className="mail-content">
                <h3>{mail.subject}</h3>
                <div className="sender-details">
                    <p className="sender-name">{mail.senderName || mail.from.split('@')[0]}</p>
                    <p className="sender-email">{`<${mail.from}>`}</p>
                </div>
                <p className="date">{timeToDate()}</p>
                <p className="body">{mail.body}</p>
            </div>
        </section>
    )
}
