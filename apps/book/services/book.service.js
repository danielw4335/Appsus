import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const book_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    searchGoogleBooks,
    getFilterFromSearchParams,
    resCategory
}

function query(filterBy = {}) {
    return storageService.query(book_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }

            if (filterBy.pageCount) {
                books = books.filter(book => book.pageCount >= filterBy.pageCount)
            }

            if (filterBy.minPublicationYear) {
                books = books.filter(book => book.publishedDate >= filterBy.minPublicationYear)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(book_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(book_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(book_KEY, book)
    } else {
        return storageService.post(book_KEY, book)
    }
}

function getEmptyBook() {
    return {
        id: 0,
        title: '',
        listPrice: {
            amount: 0,
            isOnSale: false
        },
        thumbnail: `https://picsum.photos/150/200?random=${utilService.getRandomIntInclusive(20, 1000)}`

    }
}


function getDefaultFilter() {
    return { title: '', minPrice: '' }
}

function _createBooks() {
    let books = utilService.loadFromStorage(book_KEY) || []
    // let books = []
    if (!books || !books.length) {
        for (let i = 0; i < 20; i++) {
            let book = createBook(i)
            books.push(book)
        }
        console.log('books', books)

        utilService.saveToStorage(book_KEY, books)
    }
}

function createBook(i) {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const book = {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [
            utilService.makeLorem(1)
        ],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `https://picsum.photos/150/200?random=${i + 1}`,
        language: "en",
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
    return book
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function searchGoogleBooks(searchTerm) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const googleBooks = data.items || []
            const convertedBooks = googleBooks.map(convertGoogleBook)
            console.log(convertedBooks)
            return convertedBooks
        })
        .catch(err => console.error('API fetch error:', err))
}

function convertGoogleBook(googleBook) {
    const info = googleBook.volumeInfo

    return {
        title: info.title || '',
        subtitle: info.subtitle || '',
        authors: info.authors || [],
        publishedDate: info.publishedDate || '',
        description: info.description || '',
        pageCount: info.pageCount || 0,
        categories: info.categories || [],
        thumbnail: (info.imageLinks && info.imageLinks.thumbnail) || '',
        language: info.language || 'en',
        listPrice: {
            amount: utilService.getRandomIntInclusive(20, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
}

function getFilterFromSearchParams(searchParams) {
    const title = searchParams.get('title') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const pageCount = searchParams.get('pageCount') || ''
    const minPublicationYear = searchParams.get('minPublicationYear') || ''
    return {
        title,
        minPrice,
        pageCount,
        minPublicationYear
    }
}

function resCategory() {
 return new Promise(resolve => {
    const books = utilService.loadFromStorage(book_KEY)
    const countsMap = {}

    books.forEach(item => {
        item.categories.forEach(brand => {
          countsMap[brand] = (countsMap[brand] || 0) + 1
        })
      })
// console.log(countsMap)
      const countsArray = Object.entries(countsMap).map(([brand, count]) => {
        return { brand, count }
      })
  
    resolve(countsArray)
  })
}


