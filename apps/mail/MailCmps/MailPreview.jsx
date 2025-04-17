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
            <a class="fa-regular fa-square"></a>
            {/* <i class="fa-regular fa-square-check"></i> */}
            <i class="fa-regular fa-star"></i>
            {/* <i class="fa-solid fa-star"></i> */}
            <i class="fa-regular fa-tag"></i>
            {/* <i class="fa-solid fa-tag"></i> */}
 

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
    