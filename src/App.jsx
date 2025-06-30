import './App.css';
import MainDisplay from './components/MainDisplay';
import AsideComponent from './components/AsideComponent';
import { useState } from "react";
import CreatingProject from './components/CreatingProject';
import PageComponent from './components/PageComponent';

function App() {
  const [addingProject, setAddingProject] = useState(false);
  const [pageVisibility, setPageVisibility] = useState(-1);
  const [createdProjects, setCreatedProjects] = useState([]);

  function handleChangeMainVisibility(changeActive) {
    setMainAppearance(changeActive);
    setAddingProject(false);
  }

  function handleAddProject(changeActive) {
    setAddingProject(changeActive);
    setPageVisibility(-1);
  }

  function handleChangeVisibilty(index) {
    setAddingProject(false);
    setPageVisibility(index);
  }

  function handleCreateNewProject(lastEnteredValues) {
    // console.log(lastEnteredValues);
    setCreatedProjects((lastData) => {
      return [ {...lastEnteredValues, tasks: [...lastEnteredValues.tasks]}, ...lastData];
    });
    setAddingProject(false);
  }

  function handleDeleteProject() {
    const result = confirm(`Are You sure you want to delete project ${createdProjects[pageVisibility].titleEntered}?`);
    if(result)
    {
      createdProjects.splice(pageVisibility, 1);
      setPageVisibility(-1);
    }
}

  return (
    <div className="App flex min-h-screen" id="app-container">
      <AsideComponent
       onAdded={handleAddProject}
       yourProjects={createdProjects}
       onVisiblePage={handleChangeVisibilty}/>
      {addingProject ? <CreatingProject 
       onAdded={handleAddProject} 
       onCreated={handleCreateNewProject}/> :
       pageVisibility !== -1 ? <PageComponent neededObj={createdProjects[pageVisibility]} onProjectDelete={handleDeleteProject}/>: <MainDisplay onAdded={handleAddProject}/>}
    </div>
  );
}

export default App;
