import {  useState, useRef, useContext } from "react";
import can from "../../assets/can_16228887.png"
import Checkbox from '@mui/material/Checkbox';
import TransparentButtonComponent from "../buttons/TransparentButtonComponent"; 
import SpeedDialTooltipOpen from "../speedDial/SpeedDialTooltipOpen.jsx";
import CreateTaskDialog from '../notfifcations/createTask/CreateTaskDialog';
import { PageContext } from "../../context/PageContext.jsx";
import AccordionUsage from "../accordions/AccordionUsage.jsx";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CustomizedSnackbars from "../notfifcations/snackbar/CustomizedSnackbars.jsx";
import { AppContext } from '../../context/AppContext';

let currTitle;
export default function PageComponent({neededObj, onProjectDelete}) {
    const App = useContext(AppContext);
    const {titleEntered, dateEntered, descriptionEntered, tasks, complete} = neededObj;
    const [ enteredValue, setEnteredValue ] = useState("");
    const [ complitedCount, setComplited ] = useState(complete.completed);
    const chkRefs = useRef(complete.completedArr);
    const [openDialog, setOpen] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
      
  const handleCloseSnackbar = (event, reason) => {
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
    
    const unCompletedContent = tasks.length - complitedCount > 0 ? tasks.map(item => 
            <li className={chkRefs.current[tasks.indexOf(item)] ? "items-center hidden" : "flex items-center"} key={item}>
                <div className="mr-2">
                    <Checkbox {...label} onChange={(event) => handleChangeCheckboxValue(event, tasks.indexOf(item))} checked={false} color="default"/>
                </div>
                <div className="flex px-4 py-2 my-2 items-center bg-slate-100 transform duration-500 hover:bg-slate-200 flex-grow">
                    <p className="flex-grow overflow-ellipsis overflow-hidden">{item}</p>
                    <button onClick={() => handleDeleteTask(tasks.indexOf(item))} className="mr-2 bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500">Clear</button>
                </div>
            </li>
    ) : <li className="text-stone-300 h-8 text-xl list-none">* Here tasks you need to do</li>;

    const completedContent = complitedCount > 0 ? tasks.map(item => 
            <li className={!chkRefs.current[tasks.indexOf(item)] ? "items-center hidden" : "flex items-center"} key={item}>
                <div className="mr-2">
                    <Checkbox {...label} onChange={(event) => handleChangeCheckboxValue(event, tasks.indexOf(item))} checked={true} color="default"/>
                </div>
                <div className="flex px-4 py-2 my-2 items-center bg-slate-100 transform duration-500 hover:bg-slate-200 flex-grow">
                    <p className="flex-grow line-through overflow-ellipsis overflow-hidden">{item}</p>
                    <button onClick={() => handleDeleteTask(tasks.indexOf(item))} className="mr-2 bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500">Clear</button>
                </div>
            </li>
    ) : <li className="text-stone-300 h-8 text-xl list-none">* Here your completed tasks</li>

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };
    
    if(currTitle !== titleEntered) {
        currTitle = titleEntered;
        setComplited(complete.completed);
        chkRefs.current = complete.completedArr;
        setEnteredValue("");
    }

    function handleAddANewTask(taskName) {
        if(tasks.indexOf(taskName) === -1 && taskName) {
            if(taskName.length > 50)
            {
                handleOpen("error", "Taskname is too large!");
                return;
            }
            tasks.push(taskName);
            handleOpen("info", "Task has been added");
            chkRefs.current.push(false);
            setEnteredValue("");
            }
        else {
            handleOpen("error", "This taskname isn't available!")
        }
    }


    function handleChangeCheckboxValue(event, index) {
        setComplited(prev =>{
            if(event.target.checked) {
                const curr = ++prev;
                complete.completed = curr;
                return curr;
            }
            const curr = --prev;
            complete.completed = curr;
            return curr});

        chkRefs.current[index] = event.target.checked;
    }

    function handleChangeInputText(event) {
        setEnteredValue(event.target.value);
    }

    function handleDeleteAllCompleted() {
        let arr = chkRefs.current;
        let cntr = 0;
        while(arr.filter(elem => elem).length > 0) {
            if(arr[cntr])
                arr = handleDeleteTask(cntr);
            else
                ++cntr;
        }
    }

    function handleDeleteTask(index) {
        tasks.splice(index, 1);
        const currentCheck = chkRefs.current[index];
        setComplited(prev => { 
            if(currentCheck) {
                const curr = --prev;
                complete.completed = curr;
                return curr;
            }
            return setComplited(prev) }
        );
        chkRefs.current.splice(index, 1);
        return chkRefs.current;
    }
    
    return (
        <PageContext.Provider value={{createTask: handleAddANewTask, openState: openDialog, open: handleClickOpen, close: handleClose, deleteCompleted: handleDeleteAllCompleted}}>
        <CustomizedSnackbars openState={snackbar} onClose={handleCloseSnackbar} />
        <div className="md:w-full">
        <CreateTaskDialog />
        <div className="md:hidden">
            <SpeedDialTooltipOpen />
        </div>
        <div className="md:hidden">
            <IconButton sx={{position: "absolute", top: 20, right: 16}} size="large" onClick={App.deleteProject}>
               <DeleteIcon sx={{scale: 1.5}} /> 
            </IconButton>
            <IconButton sx={{position: "absolute", top: 20, right: 81}} size="large" onClick={App.saveState}>
                <SaveIcon sx={{scale: 1.5}} />
            </IconButton>
        </div>
        <section className="pt-4 pl-10 md:p-0 min-w-96 my-16 flex-grow flex flex-wrap h-full">
            <div className="w-11/12 md:w-10/12">
                <h1 className="font-bold text-3xl md:text-4xl mb-4 overflow-ellipsis overflow-hidden">{titleEntered}</h1>
                <p className="text-stone-400 text-base md:text-lg mb-4">{new Date(dateEntered).toDateString()}</p>
                <article className="text-base md:text-lg max-width-full">
                    <p className="font-mono overflow-ellipsis overflow-hidden">
                     {descriptionEntered}
                    </p>
                </article>
            </div>
            <div className="hidden md:block">
                <button onClick={onProjectDelete} title="Delete this project" className="bg-transparent py-2 px-6 rounded-lg mb-4 transform duration-500 hover:bg-gray-100">
                    <img src={can} alt="Trash" className="w-10 h-10"/>
                </button>
            </div>
            <div className="md:mt-10 w-11/12 md:w-11/12 border-b-2 pb-5 min-h-[36rem]">
                <h2 className="font-bold text-3xl">Tasks</h2>
                <div className="hidden md:flex justify-start my-4 items-center">
                    <textarea value={enteredValue} onChange={(event) => handleChangeInputText(event)} type="text" maxLength={250} className="bg-gray-200 h-12 outline-none p-2 focus:border-b-2 border-gray-600 min-h-12 max-h-24 w-64"/>
                    <button onClick={() => handleAddANewTask(enteredValue)} className="mx-2 bg-transparent py-2 px-6 rounded-lg hover:bg-gray-100">Add Task</button>
                </div>
                <div className="md:flex justify-between">
                    {chkRefs.current.length === complitedCount && chkRefs.current.length !== 0 ? <h2 className="my-4">All tasks are completed!</h2> : <h2 className="my-4">Completed Tasks: {complitedCount}</h2>}
                    <div className="hidden md:block">
                        <TransparentButtonComponent clickEvent={handleDeleteAllCompleted}>Delete completed</TransparentButtonComponent>
                    </div>
                </div>
                <div className="md:hidden mt-8">
                    <AccordionUsage uncomplete={unCompletedContent} complete={completedContent} />
                </div>
                <div className="hidden md:flex gap-5">
                    <div className="w-full">
                        <h2 className="text-xl font-semibold">Uncomplited</h2>
                        <ul className="rounded-md min-h-full">
                            {unCompletedContent}
                        </ul>
                    </div>
                    <div className="w-full">
                        <h2 className="text-xl font-semibold">Complited</h2>
                        <ul className="rounded-md">
                            {completedContent}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </PageContext.Provider>
    );
}