import './AddPlanet.css';
import {useState} from 'react';
import { addPlanet } from '../services/api';
import { Navbarlogged } from '../components/navbarlogged';
import { changeAddedSearched } from '../services/api';
export function AddPlanet({reqData, setReqdata}) {
    let [planet,setPlanet]=useState("")
    let [mass,setMass]=useState("")
    
    async function handleAdd(e){
        e.preventDefault();
        try{
            await addPlanet({
                name: planet,
                mass: Number(mass)
            })
            alert("Success!");
            const updatedData = {
                ...reqData,
                added: reqData.added + 1
            };
            setReqdata(updatedData);
            changeAddedSearched(updatedData);
            
            setPlanet("");
            setMass("");
        }
        catch(err){
            console.log(err);
        }
    }
    return (
    <>
      <Navbarlogged />
      <div className="add-planet-page">
        <section className="add-planet-card">
          <h1>Add a Planet</h1>
          <p className="add-planet-subtitle">Log a new record to your collection.</p>

          <form onSubmit={handleAdd} className="add-planet-form">
            <div className="form-row">
              <div>
                <label htmlFor="name">Planet Name</label>
                <input type="text" id="name" placeholder="Jupiter" value={planet} onChange={(e)=>{setPlanet(e.target.value)}}/>
              </div>
              
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="mass">Mass (kg)</label>
                <input type="number" id="mass" placeholder="318" value={mass} onChange={(e)=>{setMass(e.target.value)}}  />
                <span className="field-hint">Enter mass in kilograms.</span>

              </div>
              
            </div>


            <div className="form-actions">
              <button type="button" className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary">Add Planet</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}