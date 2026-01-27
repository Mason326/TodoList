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
import fetchData, { createProject, deleteAllTasksFromProject, deleteProject } from './api/db';
import Recomendations from './components/notfifcations/modal/RecomendationsModal';
import gptIcon from "./assets/chat-gpt-white.svg"
import { Badge, Box, Fab } from '@mui/material';

function TodoList() {
  const {user, checkSession} = useContext(AuthContext);
  const [addingProject, setAddingProject] = useState(false);
  const [pageVisibility, setPageVisibility] = useState(-1);
  const [createdProjects, setCreatedProjects] = useState([]);
  const [asideDisplay, setAsideDisplay] = useState(true && window.innerWidth > 1024);
  const dialog = useRef();
  const [snackbar, setSnackbar] = useState({
    isShowed: false,
    severity: "error",
    text: "Initial text"
  });
  const [openRecomendations, setOpenRecomendations] = useState(false);
  
  useEffect(() => {
    fetchData().then(data => 
      setCreatedProjects(data)
    )
  }, [pageVisibility])
  
  const handleClickRecomendations = () => {
    setOpenRecomendations(true);
  };

  const handleCloseRecomendations = () => {
    setOpenRecomendations(false);
  };


  
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
      .then(data => 
        setCreatedProjects(prev => [...prev, data])
      )
    setAddingProject(false);
    handleOpen("info", "Project has been created");
  }

  function handleShowModal() {
    dialog.current.open();
  }

  function handleDeleteProject(projectId) {
      deleteAllTasksFromProject(projectId)
        .then(() =>
          deleteProject(projectId)
        )
        .then(() => {
          setPageVisibility(-1);
          handleOpen("info", "Project has been deleted");
        })
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
    <Box sx={{ position: 'fixed', right: 25, bottom: 25 }}>
      <Badge 
        color="primary" 
        variant='dot'
        overlap="circular"
        sx={{
      '& .MuiBadge-badge': {
        top: 10,
        right: 10,
        zIndex: 1301,
        width: 10,
        height: 10
      }
    }}>
        <Fab color='primary' aria-label='ask gpt' sx={{ 
          bgcolor: 'black',
          color: 'white',
          '&:hover': {
            bgcolor: '#333',
          }
      }}>
          <img srcSet={gptIcon} alt='gpt' />
        </Fab>
      </Badge>
    </Box>
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
        onDeleteProject={() => handleDeleteProject(pageVisibility)}
        projectTitle={createdProjects.findLast(elem => elem.project_id == pageVisibility).project_name}/>
      }
    </div>
    </AppContext.Provider>
    <Recomendations open={openRecomendations} onClose={handleCloseRecomendations} />
    </article>
  );
}

export default TodoList;
