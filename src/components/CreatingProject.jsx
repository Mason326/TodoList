import { useState, useRef } from "react";
import Message from "./notfifcations/Message";
import ColoredButtonComponent from "./buttons/ColoredButtonComponent";
import TransparentButtonComponent from "./buttons/TransparentButtonComponent";
export default function CreatingProject({onAdded, onCreated}) {
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
            onCreated(enteredValues)
        }
        else {
            invalidInputMessage.current = "Fields have to be filled!";
            handleShowErrorMessage();
        }
    }

    return (
        <>
            <section id="create-project-container" className="m-auto pb-48 w-8/12">
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
                <div className="text-start">
                    <label className="uppercase">Title</label>
                    <p>
                        <input 
                        ref={title}
                        required
                        type="text"
                        maxLength={81}
                        className="bg-gray-200 w-11/12 h-12 outline-none p-2 focus:border-b-2 border-gray-600"
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
                        className="bg-gray-200 w-11/12 h-24 min-h-24 max-h-72 outline-none p-2  focus:border-b-2 border-gray-600"
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
                            required 
                            className="bg-gray-200 w-11/12 h-12 outline-none p-2 focus:border-b-2 border-gray-600"
                            onChange={() => handleChangeEntered(date, "dateEntered")}/>
                        </p>
                    </div>
                </div>
            </section>
    </>
    );
}