
export function About() {
    return (
        <main className="about">
            <h1>About Appsus</h1>
            <p>
                Appsus is a productivity web application inspired by Google Workspace tools like Gmail and Google Keep.
                It was built as part of a Fullstack development course using modern technologies such as React, Node.js, and CSS3.
                The platform focuses on simplicity, responsive design, and modular components – allowing users to manage emails and notes in one place.
                Appsus was developed with best practices in mind: routing, state management, reusable components, and real-world app structure.
            </p>

                <h2>Meet the Developer</h2>
            <section className="about-team">
                <div className="team-grid">
                    <div className="team-card">
                        <img src="./assets/img/img-daniel.jpg" alt="Daniel wallache" className="team-img" />
                        <h4>Daniel wallache</h4>
                        <p>
                            I'm Daniel wallache, a 24-year-old Fullstack Development student from the Lachish region, currently studying at Coding Academy.
                            I'm gaining hands-on experience with modern technologies like React, Node.js, MongoDB, and responsive design.
                            The course is highly practical, project-driven, and focuses on building real-world applications from frontend to backend.
                            I'm passionate about technology, creative problem-solving, and eager to keep growing as a developer.
                        </p>
                        <a href="https://github.com/danielw4335" target="_blank" rel="noreferrer">
                            <img src="./assets/img/GitHub-Mark.png" alt="GitHub" className="github-icon" />
                        </a>
                    </div>
                </div>
                <div className="team-grid">
                    <div className="team-card">
                        <img src="./assets/img/IdoFefferImg.jpg" alt="Ido Feffer" className="team-img" />
                        <h4>Ido Feffer</h4>
                        <p>
                            I'm Ido Feffer, a 26-year-old Fullstack Development student, currently studying at Coding Academy.
                            I'm gaining hands-on experience with modern technologies like React, Node.js, MongoDB, and responsive design.
                            The course is highly practical, project-driven, and focuses on building real-world applications from frontend to backend.
                            I'm passionate about technology, creative problem-solving, and eager to keep growing as a developer.
                        </p>
                        <a href="https://github.com/IdoFeffer" target="_blank" rel="noreferrer">
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}
