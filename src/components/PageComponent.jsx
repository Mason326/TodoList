import {  useState, useRef } from "react";
import Checkbox from '@mui/material/Checkbox';
import Message from "./Message";

let currTitle;
export default function PageComponent({neededObj, onProjectDelete}) {
    const {titleEntered, dateEntered, descriptionEntered, tasks, complete} = neededObj;

    const [ enteredValue, setEnteredValue ] = useState("");
    const [ complitedCount, setComplited ] = useState(complete.completed);
    const [ displayMessage, setDisplayMessage ] = useState(false);
    const chkRefs = useRef(complete.completedArr);
    
    if(currTitle !== titleEntered) {
        currTitle = titleEntered;
        setComplited(complete.completed);
        chkRefs.current = complete.completedArr;
        setEnteredValue("");
    }

    function handleAddANewTask(taskName) {
        if(tasks.indexOf(taskName) === -1 && taskName) {
            const words = taskName.split(" ");
            for(const word of words ) {
                if(word.length > 55)
                {
                    handleShowErrorMessage()
                    return;
                }
            }
            tasks.push(taskName);
            chkRefs.current.push(false);
            // complete.completedArr = [ ...chkRefs.current ]
            setEnteredValue("");
        }
        else {
            console.log("Не удалось добавить task")
            handleShowErrorMessage()
        }
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
        // complete.completedArr[index] = event.target.checked;
    }

    function handleShowErrorMessage() {
        setDisplayMessage(true);
        setTimeout(() => {
            setDisplayMessage(false)
        }, 5000)
    }

    function handleChangeInputText(event) {
        setEnteredValue(event.target.value);
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
        // complete.completedArr.splice(index, 1);
    }

    return (
        <section className="min-w-96 my-16 flex-grow flex flex-wrap h-full">
            <div className="w-10/12">
                <h1 className="font-bold text-4xl mb-4">{titleEntered}</h1>
                <p className="text-stone-400 text-lg mb-4">{new Date(dateEntered).toDateString()}</p>
                <article className="text-lg max-width-full">
                    <p className="overflow-ellipsis font-mono">
                     {descriptionEntered}
                    </p>
                </article>
            </div>
            <div>
                <button onClick={onProjectDelete} className="bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500 mb-4">Delete</button>
                {displayMessage && <Message text="Invalid input data" />}
            </div>
            <div className="mt-10 w-9/12 border-b-2 pb-5 min-h-[36rem]">
                <h2 className="font-bold text-3xl">Tasks</h2>
                <div className="flex justify-start my-4 items-center">
                    <textarea value={enteredValue} onChange={(event) => handleChangeInputText(event)} type="text" maxLength={250} className="bg-gray-200 h-12 outline-none p-2 focus:border-b-2 border-gray-600 min-h-12 max-h-24 w-64"/>
                    <button onClick={() => handleAddANewTask(enteredValue)} className="mx-2 bg-transparent py-2 px-6 rounded-lg hover:bg-gray-100">Add Task</button>
                </div>
                {chkRefs.current.length === complitedCount && chkRefs.current.length !== 0 ? <h2 className="my-4">Все задачи выполнены!</h2> : <h2 className="my-4">Выполненных задач: {complitedCount}</h2>}
                <div className="flex gap-5">
                    <div className="w-full">
                        <h2 className="text-xl font-semibold">Uncomplited</h2>
                        <ul className="rounded-md min-h-full">
                            {tasks.length > 0 ? tasks.map(item => 
                                    <li className={chkRefs.current[tasks.indexOf(item)] ? "items-center hidden" : "flex items-center"} key={item}>
                                        <div className="mr-2">
                                            <Checkbox {...label} onChange={(event) => handleChangeCheckboxValue(event, tasks.indexOf(item))} checked={false} color="default"/>
                                        </div>
                                        <div className="flex px-4 py-2 my-2 items-center bg-slate-100 transform duration-500 hover:bg-slate-200 flex-grow">
                                            <p className="flex-grow overflow-ellipsis">{item}</p>
                                            <button onClick={() => handleDeleteTask(tasks.indexOf(item))} className="mr-2 bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500">Clear</button>
                                        </div>
                                    </li>
                            ) : <li className="text-stone-300 h-8 text-xl">* Add new task to see the result</li>}
                        </ul>
                    </div>
                    <div className="w-full">
                        <h2 className="text-xl font-semibold">Complited</h2>
                        <ul className="rounded-md">
                            {complitedCount > 0 ? tasks.map(item => 
                                    <li className={!chkRefs.current[tasks.indexOf(item)] ? "items-center hidden" : "flex items-center"} key={item}>
                                        <div className="mr-2">
                                            <Checkbox {...label} onChange={(event) => handleChangeCheckboxValue(event, tasks.indexOf(item))} checked={true} color="default"/>
                                        </div>
                                        <div className="flex px-4 py-2 my-2 items-center bg-slate-100 transform duration-500 hover:bg-slate-200 flex-grow">
                                            <p className="flex-grow">{item}</p>
                                            <button onClick={() => handleDeleteTask(tasks.indexOf(item))} className="mr-2 bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500">Clear</button>
                                        </div>
                                    </li>
                            ) : <li className="text-stone-300 h-8 text-xl">* Here your completed tasks</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}