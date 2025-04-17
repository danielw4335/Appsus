import { MailService } from "../services/mail.service"



export function MailPreview({mail}) {

    const { from, subject, body, sentAt } = mail
    return <section>
   <article className="mail-preview">
        <h2>{from}</h2>
        <h3>{subject}</h3>
        <h4>{body}</h4>
        <h5>{sentAt}</h5>
        </article>

    </section>
}


// export function BookPreview({ book }) {
//     // console.log(book);
    
//         const { from, subject, body } = book
//         return (
//             <article className="book-preview">
//                 <h2>title: {title}</h2>
//                 <h4>Price: {listPrice.amount}</h4>
//                 <img src={thumbnail} alt="Book Image" />
//             </article>
//         )
//     }
    