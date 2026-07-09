import './navbar.css'
import {Link} from "react-router-dom";
export function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">PlanetVault</span>
      <ul className="navbar-links">
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="/login">Login</Link></li>
        <li><Link className="nav-link" to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
}