import './HomePageLoggedIn.css';
import '../App.css'
import {Link} from 'react-router-dom';

import { Navbarlogged } from '../components/navbarlogged';

export function HomePageLoggedIn({ user, reqData }) {
    
    
    return (
    <>
      <Navbarlogged />
      <div className="home-loggedin">
        <section className="welcome-hero">
          <h1>Welcome back, {user?.username || 'Explorer'}</h1>
          <p>Here's what's happening in your collection.</p>
        </section>

        <section className="stat-grid">
          <div className="stat-card">
            <span className="stat-number">{reqData.searched}</span>
            <span className="stat-label">Planets Tracked</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{reqData.added}</span>
            <span className="stat-label">Added This Week</span>
          </div>
          
        </section>

        <h2 className="quick-actions-heading">Quick Actions</h2>
        <section className="quick-actions">
          <Link to="/addplanet" className="action-card">
            <span className="action-icon">➕</span>
            <h3>Add Planet</h3>
            <p>Log a new planetary record.</p>
          </Link>
          <Link to="/findplanet" className="action-card">
            <span className="action-icon">🔍</span>
            <h3>Find Planet</h3>
            <p>Search your existing collection.</p>
          </Link>
          <Link to="/profilepage" className="action-card">
            <span className="action-icon">👤</span>
            <h3>Your Profile</h3>
            <p>Manage account details.</p>
          </Link>
        </section>

        
      </div>
    </>
  );
}