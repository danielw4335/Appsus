const { useState, useEffect } = React

export function MailFolderList({ onSetFilterBy, mailCountByStatus }) {
    const [isOpen, setIsOpen] = useState(true)
    const [res, setRes] = useState(null)
  
    useEffect(() => {
      
  },[])

    function toggleSidebar() {
      setIsOpen(prev => !prev)
      if (!mailCountByStatus) return null
      setRes({
        inbox: mailCountByStatus.inbox || '',
        sent: mailCountByStatus.sent || '',
        drafts: mailCountByStatus.drafts || '',
        trash: mailCountByStatus.trash || ''
      })
      console.log(res);
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
      <aside className={`mail-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="hamburger-btn" onClick={toggleSidebar}>☰</button>
  
        <div className="sidebar-item" onClick={() => onClickFolder('inbox')}>
        <a><i className="fa-solid fa-inbox"></i> {isOpen && `Inbox ${res.inbox? res.inbox : ''}` }</a>
        </div>

        <div className="sidebar-item" onClick={() => onClickFolder('sent')}>
        <a><i className="fa-regular fa-paper-plane"></i> {isOpen && 'Sent'}</a>
                </div>

        <div className="sidebar-item" onClick={() => onClickFolder('trash')}>
        <a><i className="fa-regular fa-file"></i> {isOpen && 'Drafts'}</a>
                </div>

        <div className="sidebar-item" onClick={() => onClickFolder('trash')}>
        <a><i className="fa-regular fa-trash-can"></i> {isOpen && 'Trash'}</a>
                </div>
      </aside>
    )
  }
  