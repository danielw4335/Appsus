// const { Outlet, NavLink } = ReactRouterDOM

export function About() {
    return (
        <section className="about container">
        <h1>About This App</h1>
{/* 
<section>
    <Outlet/>
</section> */}

        <p>
            Hi! I'm Daniel, a 23-year-old full-stack development student. This app is part of my learning journey,
            built to explore and practice key React concepts like component structure, routing, services, filtering, and state management.
        </p>

        <h2> What does this app do?</h2>
        <p>
            This is a simple book catalog app. Users can browse books, filter them by title, price or year, and view details of each book.
            It's built in React using modern best practices and mock data.
        </p>

        <h2> How is the app built?</h2>
        <ul>
            <li><strong>React functional components</strong> - built with hooks like <code>useState</code> and <code>useEffect</code></li>
            <li><strong>React Router</strong> - for page navigation between Home, About, Book List, and Book Details</li>
            <li><strong>Services</strong> - logic is separated in files like <code>book.service.js</code> and <code>async-storage.service.js</code> to handle data fetching, filtering and storage</li>
            <li><strong>Mock Data</strong> - the books are loaded from a local mock file or local storage</li>
            <li><strong>Filtering</strong> - the <code>BookFilter</code> component updates the filter criteria using controlled inputs</li>
            <li><strong>Component Structure</strong>:
                <ul>
                    <li><code>BookIndex</code> - main page for listing books</li>
                    <li><code>BookList</code> & <code>BookPreview</code> - show each book in a card layout</li>
                    <li><code>BookDetails</code> - shows full information of a selected book</li>
                    <li><code>BookFilter</code> - allows filtering by title, price, and year</li>
                </ul>
            </li>
        </ul>

        <h2> Technologies Used</h2>
        <ul>
            <li>React</li>
            <li>React Router</li>
            <li>JavaScript (ES6+)</li>
            <li>HTML & CSS</li>
        </ul>

        <h2> What's next?</h2>
        <p>
            I plan to keep adding features like sorting, book editing, user login, and perhaps even connecting it to a real API. Stay tuned!
        </p>
    </section>
    )
}


