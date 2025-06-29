import {  useState, useRef } from "react";
import Checkbox from '@mui/material/Checkbox';

export default function PageComponent({neededObj, onProjectDelete}) {
    const [ enteredValue, setEnteredValue ] = useState("");
    const [ complitedCount, setComplited ] = useState(0);
    const chkRefs = useRef([]); 

    const {titleEntered, dateEntered, descriptionEntered, tasks} = neededObj;
    function handleAddANewTask(taskName) {
        if(tasks.indexOf(taskName) === -1 && taskName) {
            tasks.push(taskName);
            chkRefs.current = [ ...chkRefs.current, false]
            setEnteredValue("");
        }
        else {
            console.log("Не удалось добавить task")
        }
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    function handleChangeCheckboxValue(event, index) {
        setComplited(prev => event.target.checked ? ++prev : --prev);
        chkRefs.current[index] = event.target.checked;
    }

    function handleChangeInputText(event) {
        setEnteredValue(event.target.value);
    }

    function handleDeleteTask(index) {
        tasks.splice(index, 1);
        const currentCheck = chkRefs.current[index];
        setComplited(prev => currentCheck ? --prev : setComplited(prev));
        chkRefs.current.splice(index, 1);
    }

    return (
        <section className="min-w-96 my-16 flex-grow flex flex-wrap h-fit">
            <div className="w-10/12">
                <h1 className="font-bold text-4xl mb-4">{titleEntered}</h1>
                <p className="text-stone-400 text-lg  mb-4">{new Date(dateEntered).toDateString()}</p>
                <pre className="text-lg">
                    {descriptionEntered}
                </pre>
            </div>
            <div>
                <button onClick={onProjectDelete} className="bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500">Delete</button>
            </div>
            <div className="mt-10 w-9/12">
                <h2 className="font-bold text-3xl">Tasks</h2>
                <div className="flex justify-start my-4 items-center">
                    <input value={enteredValue} onChange={(event) => handleChangeInputText(event)} type="text" className="bg-gray-200 h-8 outline-none p-2 focus:border-b-2 border-gray-600"/>
                    <button onClick={() => handleAddANewTask(enteredValue)} className="mx-2 bg-transparent py-2 px-6 rounded-lg hover:bg-gray-100">Add Task</button>
                </div>
                <div className="min-h-64">
                    <ul className="rounded-md min-h-full">
                        {tasks.length > 0 ? tasks.map(item => 
                                <li className={chkRefs.current[tasks.indexOf(item)] ? "items-center hidden" : "flex items-center"} key={item}>
                                    <div className="mr-2">
                                        <Checkbox {...label} onChange={(event) => handleChangeCheckboxValue(event, tasks.indexOf(item))} checked={false} color="default"/>
                                    </div>
                                    <div className="flex min-w-96 px-4 py-2 my-2 items-center bg-slate-100 transform duration-500 hover:bg-slate-200 flex-grow">
                                        <p className="flex-grow">{item}</p>
                                        <button onClick={() => handleDeleteTask(tasks.indexOf(item))} className="mr-2 bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500">Clear</button>
                                    </div>
                                </li>
                        ) : <li className="text-stone-300 h-8 text-xl">* Add new task to see the result</li>}
                    </ul>
                </div>
                <hr className="bg-slate-700 h-1" />
                <h2 className="text-xl font-semibold">Complited</h2>
                {chkRefs.current.length === complitedCount && chkRefs.current.length != 0? <h2>Все задачи выполнены!</h2> : <h2>Выполненных задач: {complitedCount}</h2>}
                <div>
                    <ul className="rounded-md">
                        {complitedCount > 0 ? tasks.map(item => 
                                <li className={!chkRefs.current[tasks.indexOf(item)] ? "items-center hidden" : "flex items-center"} key={item}>
                                    <div className="mr-2">
                                        <Checkbox {...label} onChange={(event) => handleChangeCheckboxValue(event, tasks.indexOf(item))} checked={true} color="default"/>
                                    </div>
                                    <div className="flex min-w-96 px-4 py-2 my-2 items-center bg-slate-100 transform duration-500 hover:bg-slate-200 flex-grow">
                                        <p className="flex-grow">{item}</p>
                                        <button onClick={() => handleDeleteTask(tasks.indexOf(item))} className="mr-2 bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500">Clear</button>
                                    </div>
                                </li>
                        ) : <li></li>}
                    </ul>
                </div>
            </div>
        </section>
    );
}