import './ProfilePage.css';
import { useState } from 'react';
import { Navbarlogged } from '../components/navbarlogged';
import { deleteProfile, editProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

export function ProfilePage({ user, setUser, reqData }) {
    let [newName, setNewName] = useState("");
    let [newEmail, setEmail] = useState("");
    let [newPassword, setNewPassword] = useState("");

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    async function handleNewProfile(e) {
        e.preventDefault();
        try {
            const newData = {}
            if (newName.trim() !== "") newData.username = newName
            if (newEmail.trim() !== "") newData.email = newEmail
            if (newPassword.trim() !== "") newData.password = newPassword
            const updated = await editProfile(newData);
            setUser(updated); // we get the complete data from the backend now, and setuser updates the state everywhere
            alert("Profile Updated!");
        }
        catch (err) {
            console.log(err);
        }
    }
    async function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }
    async function handleDelete() {
        try {
            await deleteProfile(user);
            alert("Account Successfully removed!")
            navigate("/signup");
            
        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            <Navbarlogged />
            <div className="profile-page">
                <section className="profile-header">
                    <div className="avatar">{(user?.username || 'PV').slice(0, 2).toUpperCase()}</div>
                    <div>
                        <h1>{user?.username || 'YourPikachu'}</h1>
                        <p>{user?.email || 'ada@planetvault.com'}</p>
                    </div>
                </section>

                <section className="stat-grid">
                    <div className="stat-card">
                        <span className="stat-number">{reqData.added}</span>
                        <span className="stat-label">Planets Added</span>
                    </div>

                </section>
                <div><button onClick={logout} type="submit" className="btn-primary">Logout</button></div>

                <section className="profile-form-section">
                    <h2>Account Details</h2>
                    <form className="profile-form" onSubmit={handleNewProfile}>
                        <label htmlFor="name">UserName</label>
                        <input type="text" id="name" placeholder={user?.username} value={newName} onChange={(e) => setNewName(e.target.value)} />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder={user?.email} value={newEmail} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="new-password">New Password</label>
                        <input type="password" id="new-password" placeholder="Leave blank to keep current" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                        <button type="submit" className="btn-primary">Save Changes</button>
                    </form>

                </section>

                {!showModal && (<section className="danger-zone">
                    <h2>Danger Zone</h2>
                    <p>Deleting your account permanently removes your planetary collection.</p>
                    <button onClick={(() => setShowModal(true))} className="btn-danger">Delete Account</button>
                </section>)
                }
                {showModal && (
                    <div className="modal-overlay">

                        <section className="danger-zone">

                            <h2>Delete Account?</h2>

                            <p>
                                This action cannot be undone.
                            </p>

                            <div className="modal-actions">

                                <button
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn-danger"
                                    onClick={handleDelete}
                                >
                                    Confirm Delete
                                </button>

                            </div>

                        </section>

                    </div>
                )}
            </div>

        </>
    );
}