import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { demoMails } from './mails-demo-data.service.js'

const mail_KEY = 'mailDB'
_createMails()

export const MailService = {
    query,
    getFilterFromSearchParams,
    markAsRead,
    get,
    deleteMail,
    save,
    addMail,
    getMails,
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function addMail(data) {
    const mail = {
        createdAt: Date.now(),
        subject: data.Subject,
        body: data.body,
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedinUser.email,
        to: data.mail,
        status: 'sent',
        isStared: false,
        lables: []
    }
    save(mail)
}

function _createMails(count = 5) {
    const mails = utilService.loadFromStorage(mail_KEY)

    if (mails && mails.length) return

    Promise.resolve(demoMails).then(mails => {
        if (!mails || !mails.length) {
            mails = []
            for (let i = 0; i < count; i++) {
                mails.push({
                    id: utilService.makeId(),
                    createdAt: Date.now(),
                    subject: `${utilService.makeLorem(5)} Mail Subject ${i + 1}`,
                    body: utilService.makeLorem(20),
                    isRead: false,
                    sentAt: Date.now() + i * 1000,
                    removedAt: null,
                    from: `sender${i + 1}@mail.com`,
                    to: `user@appsus.com`,
                    status: 'inbox',
                    isStared: Math.random() > 0.5,
                    lables: []
                })
            }
        }

        utilService.saveToStorage(mail_KEY, mails)
    }).catch(err => {
        console.error(' Failed to create mails:', err)
    })
}

function getMails() {
    return utilService.loadFromStorage(mail_KEY) || []
}

function query(filterBy = {}) {
    return storageService.query(mail_KEY).then(mails => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            mails = mails.filter(mail =>
                regExp.test(mail.subject || mail.body || mail.from || mail.to)
            )
        }
        if (filterBy.status) {
            mails = mails.filter(mail => filterBy.status === mail.status)
        }
        return mails
    })
}

function getFilterFromSearchParams(searchParams) {
    const status = searchParams.get('status') || 'inbox'
    const txt = searchParams.get('txt') || ''
    const isRead = searchParams.get('isRead') || ''
    const isStared = searchParams.get('isStared') || ''
    const lables = searchParams.get('lables') || ''
    return { status, txt, isRead, isStared, lables }
}

function markAsRead(mailId) {
    return get(mailId).then(mail => {
        mail.isRead = true
        return save(mail)
    })
}

function deleteMail(mailId) {
    return get(mailId).then(mail => {
        mail.status = 'trash'
        return save(mail)
    })
}

function get(mailId) {
    return storageService.get(mail_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(mail_KEY, mail)
    } else {
        return storageService.post(mail_KEY, mail)
    }
}
