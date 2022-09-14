import React, {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";

import Header from './Components/Header';
import AddProject from './Components/AddProject';
import Landing from "./Components/Landing";
import ProjectDetails from './Components/ProjectDetails'
import Modal from "./Components/Modal";


function App() {
  const [ activeProject, setActiveProject ] = useState({});


  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/add-project" element={<AddProject edit={false} />} />
        <Route path="/project-details/:id" element={<ProjectDetails setActiveProject={setActiveProject} />} />
        <Route path="/edit-project/:id" element={<AddProject activeProject={activeProject} edit={true} />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
