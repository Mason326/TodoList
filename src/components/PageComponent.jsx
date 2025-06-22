import { useRef, useState } from "react";
export default function PageComponent({neededObj, onProjectDelete}) {
    const enteredTask = useRef();
    const [changed, setChanged] = useState(false);
    const [taskDeleted, setTaskDeleted] = useState(false);
    const {titleEntered, dateEntered, descriptionEntered, tasks} = neededObj;

    function handleAddANewTask(taskName) {
        tasks.indexOf(taskName) === -1 && changed && taskName ? tasks.push(taskName) : console.log("Не удалось добавить task");
        setChanged(false);
        console.log(tasks);
    }

    function handleChangeInputText(event) {
        setChanged(true);
        enteredTask.current = event.target.value;
    }

    function handleDeleteTask(index) {
        tasks.splice(index, 1);
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
                <button onClick={onProjectDelete} className="bg-transparent py-2 px-6 rounded-lg hover:bg-gray-100">Delete</button>
            </div>
            <div className="mt-10 w-9/12">
                <h2 className="font-bold text-3xl">Tasks</h2>
                <div className="flex justify-start my-4 items-center">
                    <input ref={enteredTask} onChange={handleChangeInputText} type="text" className="bg-gray-200 h-8 outline-none p-2 focus:border-b-2 border-gray-600"/>
                    <button onClick={() => handleAddANewTask(enteredTask.current)} className="mx-2 bg-transparent py-2 px-6 rounded-lg hover:bg-gray-100">Add Task</button>
                </div>
                <div>
                    <ul className="bg-slate-100 p-4 rounded-md">
                        {tasks.length > 0 ? tasks.map(item => 
                                <li className="flex min-w-96 m-2" key={item}>
                                    <p className="flex-grow text-lg">{item}</p>
                                    <button onClick={() => handleDeleteTask(tasks.indexOf(item))} className="mr-2 bg-transparent py-2 px-6 rounded-lg hover:bg-gray-200">Clear</button>
                                </li>
                        ) : <li className="text-stone-400 h-8 text-xl">Add new task to see the result</li>}
                    </ul>
                </div>
            </div>
        </section>
        </>
    );
}