import './App.css';
import MainDisplay from './components/MainDisplay';
import AsideComponent from './components/AsideComponent';
import { useState } from "react";
import CreatingProject from './components/CreatingProject';

function App() {
  const [addingProject, setAddingProject] = useState(false);
  const [pageVisibility, setPageVisibility] = useState(-1);
  const [createdProjects, setCreatedProjects] = useState([]);

  function handleAddProject(changeActive) {
    setAddingProject(changeActive);
    setPageVisibility(-1);
  }

  function handleChangeVisibilty(index) {
    setAddingProject(false);
    setPageVisibility(index);
    console.log(createdProjects[index]);
    console.log(index);
    console.log(createdProjects);
  }

  function handleCreateNewProject(lastEneredValues) {
    setCreatedProjects((lastData) => {
      return [
        {...lastEneredValues},
        ...lastData
      ];
    });
    setAddingProject(false);
  }

  return (
    <div className="App flex min-h-screen">
      <AsideComponent
       onAdded={handleAddProject}
       yourProjects={createdProjects}
       onVisiblePage={handleChangeVisibilty}/>
      {addingProject ? <CreatingProject 
       onAdded={handleAddProject} 
       onCreated={handleCreateNewProject}/> :
       pageVisibility !== -1 ? <h1>{createdProjects[pageVisibility].titleEntered}</h1> : <MainDisplay onAdded={handleAddProject}/>}
    </div>
  );
}

export default App;
