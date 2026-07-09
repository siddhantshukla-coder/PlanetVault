import './HomePage.css'
import { Navbar } from '../components/navbar';
import { useNavigate } from "react-router-dom";
export function HomePage() {
    const navigate=useNavigate();
    return (<>
        <>
            <Navbar />

            <section className="hero">

                <div className="hero-content">

                    <h1>PlanetVault</h1>

                    <h2>
                        Explore the Universe.
                        <br />
                        Securely Manage Your Planetary Collection.
                    </h2>

                    <p>
                        PlanetVault is a modern full-stack web application that allows
                        users to securely create, manage, update and explore planetary
                        data through an intuitive interface backed by a powerful Node.js
                        and MongoDB backend.
                    </p>


                </div>

            </section>

            <section className="features">

                <h2>Why PlanetVault?</h2>

                <div className="feature-container">

                    <div className="feature-card">
                        <h3>🪐 Planet Management</h3>
                        <p>
                            Create, update, search and delete planets effortlessly with
                            a clean and intuitive interface.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>🔐 Secure Authentication</h3>
                        <p>
                            User accounts are protected using bcrypt password hashing
                            and JWT authentication.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>☁ Cloud Database</h3>
                        <p>
                            Every planet is securely stored on MongoDB Atlas and can be
                            accessed from anywhere.
                        </p>
                    </div>

                </div>

            </section>

            <section className="tech-stack">

                <h2>Built With</h2>

                <div className="stack">

                    <span>⚛ React</span>
                    <span>🟢 Node.js</span>
                    <span>🚀 Express.js</span>
                    <span>🍃 MongoDB</span>
                    <span>🛡 JWT</span>
                    <span>🔑 bcrypt</span>

                </div>

            </section>

            <section className="how-it-works">

                <h2>How It Works</h2>

                <div className="steps">

                    <div className="step">
                        <h3>1</h3>
                        <p>Create your account</p>
                    </div>

                    <div className="step">
                        <h3>2</h3>
                        <p>Log in securely</p>
                    </div>

                    <div className="step">
                        <h3>3</h3>
                        <p>Add and manage planets</p>
                    </div>

                    <div className="step">
                        <h3>4</h3>
                        <p>Explore a collection of planets </p>
                    </div>

                </div>

            </section>

            <section className="cta">

                <h2>Ready to Explore?</h2>

                <p>
                    Join PlanetVault today and start building and exploring
                    planetary collection.
                </p>

                <div className="cta-buttons">

                    <button onClick={()=>{
                        navigate("/login");
                    }}>Login</button>

                    <button onClick={()=>{
                        navigate("/signup")
                    }}>Sign Up</button>

                </div>

            </section>
        </>






    </>)
}