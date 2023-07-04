import './App.css';
import { Layout } from './components/Layout/Layout.js';
import { Routes, Route } from "react-router-dom";
import { Login } from './pages/Auth/Login.js';
import { Header } from './components/Layout/Header.js';
import { Private } from './components/Routes/Private.js';
import { AdminDashboard } from './pages/Admin/AdminDashboard.js';
import { AdminElement } from './pages/Admin/AdminElement.js';
import { AdminModule } from './pages/Admin/AdminModule.js';
import { ProfDashboard } from './pages/professeur/ProfDashboard.js';
import { PrivateProf } from './components/Routes/PrivateProf.js';
import { NoteElement } from './pages/professeur/NoteElement.js';

function App() {
  return (
    <>
        <Routes>
           <Route path="/" element={<Login />} />  
           <Route path="/Home" element={<Private />}>
                <Route path="admin" element={<AdminDashboard />}/>
                <Route path="admin/module" element={<AdminModule />}/>
                <Route path="admin/element" element={<AdminElement />}/>
           </Route>
           <Route path="/Home" element={<PrivateProf />}>
                <Route path="prof" element={<ProfDashboard />}/>
                <Route path="prof/noteElement/:id" element={<NoteElement />}/>
           </Route>
        </Routes>
    </>
  );
}

export default App;
