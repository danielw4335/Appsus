import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const mail_KEY = 'bookDB'
_createMails()

export const mailService = {
    query,
    getFilterFromSearchParams,
    // get,
    // save,
    // remove
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
   }
   
   const mail = {
    id: 'e101',
    createdAt : 1551133930500,
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    removedAt : null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
    }



       function _createMails(count = 5) {
        let mails = utilService.loadFromStorage(mail_KEY) || []

    if(!mails || !mails.length){
        console.log('creat mails', mails)
        for (let i = 0; i < count; i++) {
            const mail = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                subject: `${utilService.makeLorem(5)} Mail Subject ${i + 1}`,
                body: utilService.makeLorem(20),
                isRead: Math.random() > 0.5,
                sentAt: Date.now() + i * 1000,
                removedAt: null,
                from: `sender${i + 1}@mail.com`,
                to: `user@appsus.com`,
                status: 'inbox',
                isStared: Math.random() > 0.5,
                lables: []
            }
            

            mails.push(mail)
        }
    }
        utilService.saveToStorage(mail_KEY, mails)
    }
    


       function query(filterBy = {}) {
        return storageService.query(mail_KEY)
            .then
            (mails => {
                console.log('before filtering',mails)
                if (filterBy.txt) {
                    const regExp = new RegExp(filterBy.txt, 'i')
                    mails = mails.filter(mail => regExp.test(mail.subject || mail.body || mail.from || mail.to))
                }
                // if (filterBy.minPrice) {
                //     mails = mails.filter(mail => mail.listPrice.amount >= filterBy.minPrice)
                // }
    
                // if (filterBy.pageCount) {
                //     mails = mails.filter(mail => mail.pageCount >= filterBy.pageCount)
                // }
    
                // if (filterBy.minPublicationYear) {
                //     mails = mails.filter(mail => mail.publishedDate >= filterBy.minPublicationYear)
                // }
                console.log('after filtering',mails)
                return mails
            })
    }

     

    function getFilterFromSearchParams(searchParams) {
        const status = searchParams.get('status') || ''
        const txt = searchParams.get('txt') || ''
        const isRead = searchParams.get('isRead') || ''
        const isStared = searchParams.get('isStared') || ''
        const lables = searchParams.get('lables') || ''
        return {
            status,
            txt,
            isRead,
            isStared,
            lables
        }
    }

    // function get(bookId) {
    //     return storageService.get(book_KEY, bookId).then(_setNextPrevBookId)
    // }
    
    // function remove(bookId) {
    //     // return Promise.reject('Oh No!')
    //     return storageService.remove(book_KEY, bookId)
    // }
    
    // function save(book) {
    //     if (book.id) {
    //         return storageService.put(book_KEY, book)
    //     } else {
    //         return storageService.post(book_KEY, book)
    //     }
    // }
