import './App.css';
import MainDisplay from './components/pages/MainDisplay';
import AsideComponent from './components/AsideComponent';
import { useState, useRef } from "react";
import { AppContext } from './context/AppContext';
import CreatingProject from './components/CreatingProject';
import PageComponent from './components/pages/PageComponent';
import ModalComponent from "./components/notfifcations/modal/ModalComponent";
import menu from "./assets/menuIcon.svg";
import CustomizedSnackbars from './components/notfifcations/snackbar/CustomizedSnackbars';

function App() {
  const [addingProject, setAddingProject] = useState(false);
  const [pageVisibility, setPageVisibility] = useState(-1);
  const [createdProjects, setCreatedProjects] = useState(JSON.parse(localStorage.getItem("projects")) || []);
  const [asideDisplay, setAsideDisplay] = useState(true && window.innerWidth > 1024);
  const dialog = useRef();
  const [snackbar, setSnackbar] = useState({
    isShowed: false,
    severity: "error",
    text: "Initial text"
  });
  
  const handleOpen = (severity, text) => {
        setSnackbar({
          isShowed: true,
          severity,
          text
        });
      };
      
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSnackbar((prev) => {
        return {
            isShowed: false,
            severity: prev.severity,
            text: prev.text
        }
      });
  };

  function handleAddProject(changeActive) {
    if(window.innerWidth < 1024)
      setAsideDisplay(false);
    setAddingProject(changeActive);
    setPageVisibility(-1);
  }

  function handleChangeVisibilty(index) {
    setAddingProject(false);
    if(window.innerWidth < 1024)
      setAsideDisplay(false);
    setPageVisibility(index);
  }

  function handleCreateNewProject(lastEnteredValues) {
    setCreatedProjects((lastData) => {
      return [ {...lastEnteredValues, tasks: [...lastEnteredValues.tasks]}, ...lastData];
    });
    setAddingProject(false);
    handleOpen("info", "Project has been created");
  }

  function handleShowModal() {
    dialog.current.open();
  }

  function handleDeleteProject() {
      createdProjects.splice(pageVisibility, 1);
      setPageVisibility(-1);
      handleOpen("info", "Project has been deleted");
}

  function handleAddToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(createdProjects));
    handleOpen("success", "Saved to Local Storage");
    setAsideDisplay(false);
  } 

  return (
    <article>
    <CustomizedSnackbars openState={snackbar} onClose={handleClose} />
    <button className="block lg:hidden py-2 px-4 fixed" onClick={() => setAsideDisplay(prev => !prev)}>
        <img src={menu} alt="menu-Icon" className='size-14' />
    </button>
    <AppContext.Provider value={{creatingPage: handleAddProject, saveState: handleAddToLocalStorage, deleteProject: handleShowModal, visiblePage: handleChangeVisibilty, projects: createdProjects}}>
    <div className="App flex min-h-screen" id="app-container">
      <AsideComponent
       onAdded={handleAddProject}
       onLocal={handleAddToLocalStorage}
       showAside={asideDisplay}
       setShowAside={setAsideDisplay}/>
      {addingProject ? <CreatingProject 
       onAdded={handleAddProject} 
       onCreated={handleCreateNewProject}
       projectNames={createdProjects.map(elem => elem.titleEntered)}/> :
       pageVisibility !== -1 ? <PageComponent neededObj={createdProjects[pageVisibility]} onProjectDelete={handleShowModal}/>: <MainDisplay onAdded={handleAddProject}/>}
       {pageVisibility !== -1 && 
        <ModalComponent ref={dialog} 
        onDeleteProject={handleDeleteProject}
        projectTitle={createdProjects[pageVisibility].titleEntered}/>
      }
    </div>
    </AppContext.Provider>
    </article>
  );
}

export default App;
