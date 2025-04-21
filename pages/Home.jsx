const { Link } = ReactRouterDOM

export function Home() {
    return (
        <main className="page home-page">
            <h1>Welcome to Appsus</h1>
            <p>One place for everything – manage your emails and keep your ideas organized.</p>

            <section className="app-grid">
                <div className="app-card">
                    <img src="./assets/img/Gmail.png" alt="Mail App" />
                    <h3>Appsus Mail</h3>
                    <Link to="/mail" className="try-btn">Open</Link>
                </div>
 
                <div className="app-card">
                    <img src="./assets/img/Keep.png" alt="Keep App" />
                    <h3>Appsus Keep</h3>
                    <Link to="/note" className="try-btn">Open</Link>
                </div>
            </section>

            <footer className="built-by">Built by Daniel && Ido © 2025</footer>
        </main>
    )
}
