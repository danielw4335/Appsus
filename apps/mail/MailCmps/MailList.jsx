import { MailPreview } from "../MailCmps/MailPreview.jsx"
import { MailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailList({ mails, loadingClass, onReload }) {
    const [mailList, setMailList] = useState([])
  
    useEffect(() => {
        if (mails) setMailList(mails)
      }, [mails])
      

    function onMarkAsRead(mailId) {
      MailService.markAsRead(mailId).then(() => {
        setMailList(prev =>
          prev.map(mail =>
            mail.id === mailId ? { ...mail, isRead: true } : mail
          )
        )
        onReload() 
      })
    }
  

    if (!mails || !mails.length) return <div>No Mails To Show...</div>
    return (

        <ul className="mail-list container">
            {mailList.map(mail => (
               <MailPreview
               key={mail.id}
               mail={mail}
               className={loadingClass}
               onMarkAsRead={onMarkAsRead}
             />
            ))}
        </ul>
    )

}

// const { Link } = ReactRouterDOM

// import { BookPreview } from "./BookPreview.jsx";

// export function BookList({ loadingClass, books, onRemoveBook, onSelectBookId }) {

//     if (!books.length) return <div>No Books To Show...</div>
//     return (
//         <ul className="book-list container">
//             {books.map(book => (
//                 <li className={loadingClass} key={book.id}>
//                     <BookPreview book={book} />
//                     <section className="btn-feature">
//                         <button onClick={() => onRemoveBook(book.id)}>
//                             Remove
//                         </button>
//                         <button >
//                             <Link to={`/books/${book.id}`}>Details</Link>
//                         </button>
//                         <button >
//                             <Link to={`/books/edit/${book.id}`}>Edit</Link>
//                         </button>
//                          <button >
//                             <Link to={'/books/edit'}>Add</Link>
//                         </button>
//                     </section>
//                 </li>
//             ))}
//         </ul>
//     )

// }