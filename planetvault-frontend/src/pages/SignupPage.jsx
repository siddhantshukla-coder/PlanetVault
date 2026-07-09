import './AuthPage.css';
import { Navbar } from '../components/navbar';
import {Link} from "react-router-dom"
import {useState} from "react"
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';


export function SignupPage() {
    let [userName,setUserName]=useState("")
    let [email, setEmail]=useState("");
    let [password, setPassword]=useState("")
    let [conpassword,setConpassword]=useState("")
    let navigate=useNavigate();
    async function handlesignup(e){
        try{
            e.preventDefault();
            if(password!=conpassword){
                alert("Passwords don't match.");
                return;
            }
            await signup({
                username: userName,
                email,
                password,
            })
            
            navigate("/login");
        }
        catch{
            alert("Duplicate username not allowed!");
        }
    }
    return (
    <>
      <Navbar />
      <section className="auth-page">
        <div className="auth-card">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Start building your own planetary collection.</p>

          <form className="auth-form" onSubmit={handlesignup}>
            <label htmlFor="name">UserName</label>
            <input type="text" id="name" placeholder="YourPikachu" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>

            <label htmlFor="signup-email">Email</label>
            <input type="email" id="signup-email" placeholder="you@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" placeholder="••••••••" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="••••••••" value={conpassword} onChange={(e)=>{setConpassword(e.target.value)}} />

            <button type="submit" className="btn-primary">Sign Up</button>
          </form>

          <p className="auth-footer">
            <Link to="/login">Already have an account? </Link>
          </p>
        </div>
      </section>
    </>
  );
}