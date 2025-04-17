import { MailService } from "../services/mail.service"



export function MailPreview({mail}) {
    const { from, subject, body, sentAt } = mail

    
    function cutTxt() {
        let text = body
        console.log(body)
      const displayText = (typeof text === 'string')
        ? (text.length <= 100
            ? text
            : text.substring(0, 20))
        : ''
        console.log(displayText);
        return displayText
    }

    return (
        <div className="mail-preview">
        <p>{from}</p>
        <p>{subject}</p>
        <p>{cutTxt()}</p>
        <p>{sentAt}</p>
        </div>
     )
    
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
    