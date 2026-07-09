import './AuthPage.css';
import { Navbar } from '../components/navbar';
import {Link} from 'react-router-dom';
import {useState} from "react";
import { login } from '../services/api';
import {useNavigate} from "react-router-dom";
export function LoginPage() {
    let [email,setEmail]=useState("");
    let [password, setPassword]=useState("");
    const navigate=useNavigate();
    async function handleLogin(e){
        e.preventDefault();
        try{    
            
            const response=await login({
                email,
                password
            })
            if(!response) alert("Incorrect Authentication or User not Found!")
            localStorage.setItem(
                "token",
                response.token
            );
            navigate("/homepagelogged")
        }
        catch(err){
            console.log(err)
        }
    }
    return (
    <>
      <Navbar />
      <section className="auth-page">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Log in to access your planetary collection.</p>

          <form className="auth-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="you@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

            <button type="submit" className="btn-primary">Log In</button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </section>
    </>
  );
}