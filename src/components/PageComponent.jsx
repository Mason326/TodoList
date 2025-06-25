import {  useState } from "react";
import Checkbox from '@mui/material/Checkbox';

export default function PageComponent({neededObj, onProjectDelete}) {
    const [ enteredValue, setEnteredValue ] = useState("");
    const [changed, setChanged] = useState(false);
    const [taskDeleted, setTaskDeleted] = useState(false);
    const [ chBoxStates, setChBoxStates ] = useState([]);
    const {titleEntered, dateEntered, descriptionEntered, tasks} = neededObj;

    function handleAddANewTask(taskName) {
        if(tasks.indexOf(taskName) === -1 && changed && taskName) {
            tasks.push(taskName);
            setChBoxStates((prev) => [...prev, false]);
            setChanged(false);
            setEnteredValue("");
        }
        else {
            console.log("Не удалось добавить task")
        }
    }

    function handleChangeStateCheckbox(event, index) {
        setChBoxStates((prev) => {
            prev[index] = event.target.checked
            console.log([...prev]);
            return [...prev];
        });
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    function handleChangeInputText(event) {
        setChanged(true);
        setEnteredValue(event.target.value);
    }

    function handleDeleteTask(index) {
        tasks.splice(index, 1);
        setChBoxStates(prev => {
             prev.splice(index, 1);
             console.log(prev);
             return [...prev];
        });
        setTaskDeleted((prevState) => !prevState);
    }

    return (
        <>
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
                <div>
                    <ul className="rounded-md">
                        {tasks.length > 0 ? tasks.map(item => 
                                <li className="flex items-center" key={item}>
                                    <div className="mr-2">
                                        <Checkbox {...label} onChange={(event) => handleChangeStateCheckbox(event, tasks.indexOf(item))} color="default"/>
                                    </div>
                                    <div className="flex min-w-96 px-4 py-2 my-2 items-center bg-slate-100 transform duration-500 hover:bg-slate-200 flex-grow">
                                        <p className={ chBoxStates[tasks.indexOf(item)] ? "flex-grow text-lg line-through" : "flex-grow text-lg"}>{item}</p>
                                        <button onClick={() => handleDeleteTask(tasks.indexOf(item))} className="mr-2 bg-transparent py-2 px-6 rounded-lg transform duration-500 hover:text-red-500">Clear</button>
                                    </div>
                                </li>
                        ) : <li className="text-stone-300 h-8 text-xl">* Add new task to see the result</li>}
                    </ul>
                </div>
            </div>
        </section>
        </>
    );
}