import './App.css';
import MainDisplay from './components/pages/MainDisplay';
import AsideComponent from './components/AsideComponent';
import { useState, useRef } from "react";
import CreatingProject from './components/CreatingProject';
import PageComponent from './components/pages/PageComponent';
import ModalComponent from "./components/notfifcations/modal/ModalComponent";
import Message from './components/notfifcations/Message';
import menu from "./assets/menuIcon.svg";

function App() {
  const [addingProject, setAddingProject] = useState(false);
  const [pageVisibility, setPageVisibility] = useState(-1);
  const [createdProjects, setCreatedProjects] = useState(JSON.parse(localStorage.getItem("projects")) || []);
  const [displaySaveMessage, setDisplaySaveMessage] = useState(false);
  const [asideDisplay, setAsideDisplay] = useState(true && window.innerWidth > 1024);

  const dialog = useRef();

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

  function handleAddToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(createdProjects));
    setDisplaySaveMessage(true);
        setTimeout(() => {
          setDisplaySaveMessage(false)
        }, 5000)
  } 

  return (
    <article>
    <button className="block md:hidden py-2 px-4 fixed" onClick={() => setAsideDisplay(prev => !prev)}>
        <img src={menu} alt="menu-Icon" className='size-14' />
    </button>
    <div className="App flex min-h-screen" id="app-container">
      <AsideComponent
       onAdded={handleAddProject}
       yourProjects={createdProjects}
       onVisiblePage={handleChangeVisibilty}
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
      {displaySaveMessage && <Message text="saved" isSaving /> }
    </div>
    </article>
  );
}

export default App;
