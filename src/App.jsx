import './App.css';
import MainDisplay from './components/pages/MainDisplay';
import AsideComponent from './components/AsideComponent';
import { useState, useEffect, useRef } from "react";
import CreatingProject from './components/CreatingProject';
import PageComponent from './components/pages/PageComponent';
import ModalComponent from "./components/notfifcations/ModalComponent";

function App() {
  const [addingProject, setAddingProject] = useState(false);
  const [pageVisibility, setPageVisibility] = useState(-1);
  const [createdProjects, setCreatedProjects] = useState(JSON.parse(localStorage.getItem("projects")) || []);
  const dialog = useRef();

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(createdProjects));
  }, [createdProjects])

  function doAutoSave() {
    setCreatedProjects(prev => {
      return prev.length > 0 ? [...prev] : []
    });
    window.onbeforeunload = null;
  }

  window.onbeforeunload = function() {
    return doAutoSave();
  };

  function handleAddProject(changeActive) {
    setAddingProject(changeActive);
    setPageVisibility(-1);
  }

  function handleChangeVisibilty(index) {
    setAddingProject(false);
    setPageVisibility(index);
  }

  function handleCreateNewProject(lastEnteredValues) {
    setCreatedProjects((lastData) => {
      return [ {...lastEnteredValues, tasks: [...lastEnteredValues.tasks]}, ...lastData];
    });
    setAddingProject(false);
  }

  function handleShowModal() {
    dialog.current.open();
  }

  function handleDeleteProject() {
      createdProjects.splice(pageVisibility, 1);
      setPageVisibility(-1);
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
       pageVisibility !== -1 ? <PageComponent neededObj={createdProjects[pageVisibility]} onProjectDelete={handleShowModal}/>: <MainDisplay onAdded={handleAddProject}/>}
       {pageVisibility !== -1 && <ModalComponent ref={dialog} deleteHandle={handleDeleteProject} projectName={createdProjects[pageVisibility].titleEntered}></ModalComponent>}
    </div>
  );
}

export default App;
