import './App.css';
import MainDisplay from './components/MainDisplay';
import AsideComponent from './components/AsideComponent';
import { useState } from "react";
import CreatingProject from './components/CreatingProject';

function App() {
  const [addingProject, setAddingProject] = useState(false);
  const [mainAppearance, setMainAppearance] = useState(true);
  const [createdProjects, setCreatedProjects] = useState([]);

  function handleChangeMainVisibility(changeActive) {
    setMainAppearance(changeActive);
    setAddingProject(false);
  }

  function handleAddProject(changeActive) {
    setAddingProject(changeActive);
    setMainAppearance(false);
  }

  function handleCreateNewProject(lastEnteredValues) {
    // console.log(lastEnteredValues);
    setCreatedProjects((lastData) => {
      return [ {...lastEnteredValues, tasks: [...lastEnteredValues.tasks]}, ...lastData];
    });
  }

  return (
    <div className="App flex min-h-screen" id="app-container">
      <AsideComponent
       onAdded={handleAddProject}
       yourProjects={createdProjects}
       changeAppearance={handleChangeMainVisibility}/>
      {addingProject && <CreatingProject 
       onAdded={handleAddProject} 
       onCreated={handleCreateNewProject}
       changeAppearance={handleChangeMainVisibility}/>}
      {mainAppearance && <MainDisplay onAdded={handleAddProject}/>}
    </div>
  );
}

export default App;
