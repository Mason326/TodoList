import MainDisplay from './components/pages/MainDisplay';
import AsideComponent from './components/AsideComponent';
import { useState, useRef, useContext, useEffect } from "react";
import { AppContext } from './context/AppContext';
import CreatingProject from './components/CreatingProject';
import PageComponent from './components/pages/PageComponent';
import ModalComponent from "./components/notfifcations/modal/ModalComponent";
import menu from "./assets/menuIcon.svg";
import { signOutMethod } from './api/user';
import { AuthContext } from './App';
import CustomizedSnackbars from './components/notfifcations/snackbar/CustomizedSnackbars';
import fetchData, { createProject } from './api/db';

function TodoList() {
  const {user, checkSession} = useContext(AuthContext);
  const [addingProject, setAddingProject] = useState(false);
  const [pageVisibility, setPageVisibility] = useState(-1);
  const [projectCreatedCounter, setProjectCreatedCounter] = useState(0);
  const [createdProjects, setCreatedProjects] = useState([]);
  const [asideDisplay, setAsideDisplay] = useState(true && window.innerWidth > 1024);
  const dialog = useRef();
  const [snackbar, setSnackbar] = useState({
    isShowed: false,
    severity: "error",
    text: "Initial text"
  });

  useEffect(() => {
    fetchData().then(data => 
      setCreatedProjects(data)
    )
  }, [projectCreatedCounter])
  
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
            ...prev,
            isShowed: false
        }
      });
  };

  function handleAddProject(changeActive) {
    if(window.innerWidth < 1024)
      setAsideDisplay(false);
    setAddingProject(changeActive);
    setPageVisibility(-1);
  }

  function handleChangeVisibilty(idProject) {
    setAddingProject(false);
    if(window.innerWidth < 1024)
      setAsideDisplay(false);
    setPageVisibility(idProject);
  }

  function handleCreateNewProject(projectName, projectDueDate, projectDescription) {
    createProject(projectName, projectDueDate, projectDescription, user.id)
      .then(() => {
        setProjectCreatedCounter(prev => ++prev)
      })
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

  async function handleLogOut() {
    try { 
    await signOutMethod();
    checkSession()
    setSnackbar(() => {
      return {
        isShowed: true,
        text: `Logged out`,
        severity: "info"
      }
    });
  }
  catch(e) {
    console.log(e)
  }
  }

  return (user &&
    <article>
    <CustomizedSnackbars openState={snackbar} onClose={handleClose} />
    <button className="block lg:hidden py-2 px-4 fixed" onClick={() => setAsideDisplay(prev => !prev)}>
        <img src={menu} alt="menu-Icon" className='size-14' />
    </button>
    <AppContext.Provider value={{creatingPage: handleAddProject, deleteProject: handleShowModal, visiblePage: handleChangeVisibilty, projects: createdProjects}}>
    <div className="App flex min-h-screen" id="app-container">
      <AsideComponent
       onAdded={handleAddProject}
       onLogout={handleLogOut}
       showAside={asideDisplay}
       setShowAside={setAsideDisplay}/>
      {addingProject ? <CreatingProject 
       onAdded={handleAddProject} 
       onCreated={handleCreateNewProject}
       projectNames={createdProjects.map(elem => elem.project_name)}/> :
       pageVisibility !== -1 ? <PageComponent neededObj={createdProjects.findLast(elem => elem.project_id == pageVisibility)} onProjectDelete={handleShowModal}/>: <MainDisplay onAdded={handleAddProject}/>}
       {pageVisibility !== -1 && 
        <ModalComponent ref={dialog} 
        onDeleteProject={handleDeleteProject}
        projectTitle={createdProjects.findLast(elem => elem.project_id == pageVisibility).project_name}/>
      }
    </div>
    </AppContext.Provider>
    </article>
  );
}

export default TodoList;
