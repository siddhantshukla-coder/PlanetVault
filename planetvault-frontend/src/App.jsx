import { HomePage } from './pages/HomePage';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AddPlanet } from "./pages/AddPlanet";
import { FindPlanet } from "./pages/FindPlanet";
import { HomePageLoggedIn } from './pages/HomePageLoggedIn';
import { ProtectedRoute } from './components/protectedroute';
import { userData } from './services/api';
import {useState, useEffect } from 'react';
import { getAddedSearched } from './services/api';

function App() {
  let [user, setUser] = useState(null);
  useEffect(() => {
    const token=localStorage.getItem("token");
    if(!token) return;
    async function fetchUser() {
      try {
        let data = await userData();
        console.log(data);
        setUser(data)
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [])
  let [reqData, setReqdata] = useState({
    added: 0,
    searched: 0
  });
  useEffect(() => {
    const token=localStorage.getItem("token");
    if(!token) return;
    async function displayData() {
      try {
        let Data = await getAddedSearched();
        setReqdata(Data);
      }
      catch (err) {
        console.log(err);

      }
    }
    displayData();
  }, [])
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      <Route path="/addplanet" element={<ProtectedRoute><AddPlanet reqData={reqData} setReqdata={setReqdata} /></ProtectedRoute>} />

      <Route path="/findplanet" element={<ProtectedRoute><FindPlanet reqData={reqData} setReqdata={setReqdata}  /></ProtectedRoute>} />

      <Route path="/profilepage" element={<ProtectedRoute><ProfilePage user={user} setUser={setUser} reqData={reqData} /></ProtectedRoute>} />

      <Route path="/homepagelogged" element={<ProtectedRoute><HomePageLoggedIn user={user} reqData={reqData}  /></ProtectedRoute>} />


    </Routes>

  );

}

export default App
