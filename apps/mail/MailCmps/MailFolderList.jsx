const { useState, useEffect } = React

export function MailFolderList({ onSetFilterBy, mailCountByStatus, onSetIsComposing }) {
  const [isOpen, setIsOpen] = useState(false)
  const [res, setRes] = useState(null)

  useEffect(() => {
    setRes({
      inbox: mailCountByStatus.inbox || '',
      sent: mailCountByStatus.sent || '',
      drafts: mailCountByStatus.drafts || '',
      trash: mailCountByStatus.trash || '',
    })
  }, [mailCountByStatus])

  function toggleSidebar() {
    console.log(isOpen)
    
    setIsOpen(prev => !prev)
  }

  function onClickFolder(status) {
    onSetFilterBy({
      status,
      txt: '',
      isRead: '',
      isStared: '',
      lables: ''
    })
  }

  

  return (
    <aside className="mail-sidebar">

<button className="compose-button" onClick={() => onSetIsComposing(true)}>
                <i className="fa-solid fa-pen"></i>
                <span>Compose</span>
            </button>

      <div className="sidebar-item" onClick={() => onClickFolder('inbox')}>
        <i className="fa-solid fa-inbox sidebar-icon"></i>
        <span>Inbox {(res && res.inbox) || ''}</span>
      </div>

      <div className="sidebar-item" onClick={() => onSetFilterBy({ status: 'sent' })}>
        <i className="fa-regular fa-paper-plane sidebar-icon"></i>
        <span>Sent</span>
      </div>

      <div className="sidebar-item" onClick={() => onClickFolder('drafts')}>
        <i className="fa-regular fa-file sidebar-icon"></i>
        <span>Drafts {(res && res.drafts) || ''}</span>
      </div>

      <div className="sidebar-item" onClick={() => onClickFolder('trash')}>
        <i className="fa-regular fa-trash-can sidebar-icon"></i>
        <span>Trash {(res && res.trash) || ''}</span>
      </div>
    </aside>
  )
}
