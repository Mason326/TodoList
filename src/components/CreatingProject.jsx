import { useState, useRef } from "react";
import Message from "./notfifcations/Message";
import ColoredButtonComponent from "./buttons/ColoredButtonComponent";
import TransparentButtonComponent from "./buttons/TransparentButtonComponent";
import ModalComponent from "./notfifcations/modal/ModalComponent";
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
        const words = titleEntered.split(" ");
        for(const word of words ) {
            if(word.length > 25)
            {
                invalidInputMessage.current = "Taskname has too large word!";
                handleShowErrorMessage();
                return;
            }
        }

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
            <section id="create-project-container" className="m-auto pb-12 md:pb-48 w-11/12 h-screen flex flex-col md:block gap-4">
                <article>
                    <div className="mb-24 flex justify-end w-11/12">
                        {errMessageVisible && <Message text={invalidInputMessage.current} />}
                    </div>
                    <div className="hidden md:flex justify-end w-11/12">
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
                    <div className="text-start">
                        <label className="uppercase">Title</label>
                        <p>
                            <input 
                            ref={title}
                            required
                            type="text"
                            maxLength={81}
                            className="bg-gray-200 w-full md:w-11/12 h-10 md:h-12 outline-none p-2 focus:border-b-2 border-gray-600"
                            onChange={() => handleChangeEntered(title, "titleEntered")}/>
                        </p>
                    </div>
                    <div className="text-start">
                        <label className="uppercase">Description</label>
                        <p>
                            <textarea 
                            ref={description} 
                            required
                            maxLength={500}
                            className="bg-gray-200 w-full md:w-11/12 h-20 md:h-24 min-h-24 max-h-72 outline-none p-2  focus:border-b-2 border-gray-600"
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
                                min={currentDate}
                                max="31.12.9999"
                                required 
                                className="bg-gray-200 w-full md:w-11/12 h-10 md:h-12 outline-none p-2 focus:border-b-2 border-gray-600"
                                onChange={() => handleChangeEntered(date, "dateEntered")}/>
                            </p>
                        </div>
                    </div>
                </article>
                <div className="grow w-2">
                </div>
                <div className="flex flex-col gap-2 md:hidden w-full">
                    <p>
                        <ColoredButtonComponent clickEvent={() => handleSaveEntered(entered)}>
                            Save
                        </ColoredButtonComponent>
                    </p>
                    <p> 
                        <TransparentButtonComponent clickEvent={() => onAdded(false)}>
                            Cancel
                        </TransparentButtonComponent>
                    </p>
                </div>
            </section>
    </>
    );
}