import { useState, useRef } from "react";
import Message from "./notfifcations/Message";
import ColoredButtonComponent from "./buttons/ColoredButtonComponent";
import TransparentButtonComponent from "./buttons/TransparentButtonComponent";
export default function CreatingProject({onAdded, onCreated, projectNames}) {
    const [errMessageVisible, setErrMessageVisible] = useState(false);
    const title = useRef();
    const description = useRef();
    const date = useRef();
    const invalidInputMessage = useRef("Invalid input data");


    const currentDate = new Date().toISOString().split("T")[0];

    const [entered, setEntered ] = useState({
        titleEntered: "",
        descriptionEntered: "",
        dateEntered: "",
        tasks: [],
        complete: {
            completed: 0,
            completedArr: []
        }
    });

    function handleChangeEntered(refname, fieldName) {
        setEntered((prevValues) => {
            return {
                ...prevValues,
                [fieldName]: refname.current.value
            };
        });
    }

    function handleShowErrorMessage() {
        setErrMessageVisible(true);
        setTimeout(() => {
            setErrMessageVisible(false)
        }, 5000)
    }

    function handleSaveEntered(enteredValues) {
        const {titleEntered, descriptionEntered, dateEntered} = {...enteredValues};

        if(titleEntered && descriptionEntered && dateEntered) {
            if(projectNames.indexOf(titleEntered) === -1) {
                
                if(dateEntered >= currentDate)
                    onCreated(enteredValues)
                else {
                    invalidInputMessage.current = "Invalid Due Date!";
                    handleShowErrorMessage();
                }
            }
            else {
                invalidInputMessage.current = "Project name is already in use!";
                handleShowErrorMessage();
            }
        }
        else {
            invalidInputMessage.current = "Fields have to be filled!";
            handleShowErrorMessage();
        }
    }

    return (
        <>
            <section id="create-project-container" className="m-auto pb-48 w-8/12 2xl:w-10/12">
                <div className="mb-24 flex justify-end w-11/12">
                    {errMessageVisible && <Message text={invalidInputMessage.current} />}
                </div>
                <div className="flex justify-end w-11/12">
                    <p>
                        <TransparentButtonComponent clickEvent={() => onAdded(false)}>
                            Cancel
                        </TransparentButtonComponent>
                    </p>
                    <p>
                        <ColoredButtonComponent clickEvent={() => handleSaveEntered(entered)}>
                            Save
                        </ColoredButtonComponent>
                    </p>
                </div>
                <div className="text-start 2xl:mb-2">
                    <label className="uppercase xl:text-lg">Title</label>
                    <p>
                        <input 
                        ref={title}
                        required
                        type="text"
                        maxLength={81}
                        className="bg-gray-200 w-11/12 h-12 outline-none p-2 focus:border-b-2 border-gray-600 xl:text-lg 2xl:text-xl 2xl:h-14"
                        onChange={() => handleChangeEntered(title, "titleEntered")}/>
                    </p>
                </div>
                <div className="text-start 2xl:mb-2">
                    <label className="uppercase xl:text-lg">Description</label>
                    <p>
                        <textarea 
                        ref={description} 
                        required
                        maxLength={150}
                        className="bg-gray-200 w-11/12 h-24 min-h-24 max-h-72 outline-none p-2 focus:border-b-2 border-gray-600 xl:text-lg 2xl:text-xl 2xl:h-28"
                        onChange={() => handleChangeEntered(description, "descriptionEntered")}/>
                    </p>
                </div>
                <div className="text-start 2xl:mb-2">
                    <label className="uppercase xl:text-lg">Due date</label>
                    <p>
                        <input 
                        type="date"
                        ref={date} 
                        min={currentDate}
                        max="31.12.9999"
                        required 
                        className="bg-gray-200 w-11/12 h-12 outline-none p-2 focus:border-b-2 border-gray-600 xl:text-lg 2xl:text-xl 2xl:h-14"
                        onChange={() => handleChangeEntered(date, "dateEntered")}/>
                    </p>
                </div>
            </section>
    </>
    );
}