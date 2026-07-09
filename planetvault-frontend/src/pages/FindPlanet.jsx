import './FindPlanet.css';
import '../App.css'
import { findPlanet } from "../services/api"
import { Navbarlogged } from '../components/navbarlogged';
import { useState } from 'react'
import { changeAddedSearched } from '../services/api';
export function FindPlanet({ reqData, setReqdata }) {
    let [name, setName] = useState("");
    let [planets, setPlanets] = useState([])
    async function handleFind(e) {
        e.preventDefault();
        try {
            if (name) {
                const response = await findPlanet(name);
                let updatedData={...reqData}
                if(response.length===0) alert("Planet not found!")
                if(response.length>0) updatedData = {
                    ...reqData,
                    searched: reqData.searched + 1
                };
                setReqdata(updatedData);
                changeAddedSearched(updatedData);
                setPlanets(response);

            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    return (
        <>
            <Navbarlogged />
            <div className="find-planet-page">
                <section className="search-header">
                    <h1>Find a Planet</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Search by name..." value={name} onChange={(e) => { setName(e.target.value) }} />
                        <button onClick={handleFind} className="btn-primary">Search</button>
                    </div>
                </section>

                <section className="planet-grid">
                    {planets.length === 0 && (
                        <p className="empty-state">Search for a planet by name to see it here.</p>
                    )}
                    {planets.map((planet) => {
                        
                        return (
                            <div key={planet._id} className="planet-card">
                                <div className="planet-icon">🪐</div>
                                <h3>{planet.name}</h3>
                                <p className="planet-meta">{planet.mass} kg</p>
                            </div>
                        )
                    })}
                </section>
            </div>
        </>
    );
}