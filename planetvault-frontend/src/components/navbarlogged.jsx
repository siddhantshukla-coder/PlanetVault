import './navbar.css'
import {Link} from "react-router-dom";
export function Navbarlogged() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">PlanetVault</span>
      <ul className="navbar-links">
        <li><Link className="nav-link" to="/homepagelogged">Home</Link></li>
        <li><Link className="nav-link" to="/profilepage">Profile</Link></li>
        <li><Link className="nav-link" to="/addplanet">Add</Link></li>
        <li><Link className="nav-link" to="/findplanet">Find</Link></li>
      </ul>
    </nav>
  );
}