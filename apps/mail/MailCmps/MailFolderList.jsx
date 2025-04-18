const { useState, useEffect } = React

export function MailFolderList({ onSetFilterBy }) {
    const [isOpen, setIsOpen] = useState(true)
  
    function toggleSidebar() {
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
      <aside className={`mail-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="hamburger-btn" onClick={toggleSidebar}>☰</button>
  
        <div className="sidebar-item" onClick={() => onClickFolder('inbox')}>
        <a><i className="fa-solid fa-inbox"></i> {isOpen && 'Inbox'}</a>
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
  