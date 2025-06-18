import './App.css';
import MainDisplay from './components/MainDisplay';
import AsideComponent from './components/AsideComponent';
import { useState } from "react";
import CreatingProject from './components/CreatingProject';

function App() {
  const [addingProject, setAddingProject] = useState(false);
  const [createdProjects, setCreatedProjects] = useState([]);

  function handleAddProject(changeActive) {
    setAddingProject(changeActive);
  }

  function handleCreateNewProject(lastEneredValues) {
    setCreatedProjects((lastData) => {
      return [
        {...lastEneredValues},
        ...lastData
      ];
    });
  }

  return (
    <div className="App flex min-h-screen">
      <AsideComponent
       onAdded={handleAddProject}
       yourProjects={createdProjects}/>
      {addingProject ? <CreatingProject 
       onAdded={handleAddProject} 
       onCreated={handleCreateNewProject}/> : <MainDisplay onAdded={handleAddProject}/>}
    </div>
  );
}

export default App;
