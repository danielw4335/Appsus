const {Link, NavLink} = ReactRouterDOM

export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header container">
            <section>
                <h1>React Book App</h1>
                <nav className="app-nav">
                    <NavLink to="home">Home</NavLink>
                    <NavLink to="about">About</NavLink>
                    <NavLink to="books">Books</NavLink>
                    <NavLink to="dashboard">Dashboard</NavLink>
                </nav>
            </section>
        </header>
    )
}