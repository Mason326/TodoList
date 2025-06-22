import { useState, useRef } from "react";
export default function CreatingProject({onAdded, onCreated}) {
    const title = useRef();
    const description = useRef();
    const date = useRef();

    const [entered, setEntered ] = useState({
        titleEntered: "",
        descriptionEntered: "",
        dateEntered: "",
        tasks: []
    });

    function handleChangeEntered(refname, fieldName) {
        setEntered((prevValues) => {
            return {
                ...prevValues,
                [fieldName]: refname.current.value
            };
        });
    }

    function handleSaveEntered(enteredValues) {
        const {titleEntered, descriptionEntered, dateEntered} = {...enteredValues};
        titleEntered && descriptionEntered && dateEntered ? onCreated(enteredValues) : console.log("Не удалось");
    }

    return (
        <section id="create-project-container" className="my-48 m-auto w-8/12">
            <div className="flex justify-end w-11/12">
                <p>
                    <button className="mr-2 bg-transparent py-2 px-6 rounded-lg hover:bg-gray-100" onClick={() => onAdded(false)}>Cancel</button>
                </p>
                <p>
                    <button 
                     className="py-2 px-6 rounded-lg items-center text-gray-200 bg-black bg-opacity-75 hover:bg-opacity-85 text-base"
                     onClick={() => handleSaveEntered(entered)}
                    >Save</button>
                </p>
            </div>
            <div className="text-start">
                <label className="uppercase">Title</label>
                <p>
                    <input 
                     ref={title} 
                     required 
                     type="text" 
                     className="bg-gray-200 w-11/12 h-8 outline-none p-2 focus:border-b-2 border-gray-600"
                     onChange={() => handleChangeEntered(title, "titleEntered")}/>
                </p>
            </div>
            <div className="text-start">
                <label className="uppercase">Description</label>
                <p>
                    <textarea 
                     ref={description} 
                     required 
                     className="bg-gray-200 w-11/12 h-16 outline-none p-2  focus:border-b-2 border-gray-600"
                     onChange={() => handleChangeEntered(description, "descriptionEntered")}/>
                </p>
            </div>
            <div>
                <div className="text-start">
                    <label className="uppercase">Due date</label>
                    <p>
                        <input 
                         type="date" 
                         ref={date} 
                         required 
                         className="bg-gray-200 w-11/12 h-8 outline-none p-2 focus:border-b-2 border-gray-600"
                         onChange={() => handleChangeEntered(date, "dateEntered")}/>
                    </p>
                </div>
            </div>
        </section>
    );
}