import { useState, useRef, useContext } from "react";
import ColoredButtonComponent from "./buttons/ColoredButtonComponent";
import TransparentButtonComponent from "./buttons/TransparentButtonComponent";
import CustomizedSnackbars from "./notfifcations/snackbar/CustomizedSnackbars.jsx"
import { AppContext } from "../context/AppContext.jsx";
export default function CreatingProject({onAdded, onCreated}) {
    const {projects} = useContext(AppContext)
    const title = useRef();
    const description = useRef();
    const date = useRef();

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

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSnackbar((prev) => {
        return {
            ...prev,
            isShowed: false,
        }
        });
    };


    const currentDate = new Date().toISOString().split("T")[0];

    const [entered, setEntered ] = useState({
        titleEntered: "",
        descriptionEntered: "",
        dateEntered: ""
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
        const projectNames = projects.map(item => item.project_name)
        const {titleEntered, descriptionEntered, dateEntered} = {...enteredValues};

        if(titleEntered && dateEntered) {      
            if(!projectNames.find(item => item == titleEntered.trim())) {
                if(dateEntered >= currentDate)
                    onCreated(titleEntered, dateEntered, descriptionEntered)
                else {
                    handleOpen("error","Invalid Due Date!");
                }
            } else {
                handleOpen("error","Duplicate name of a project!");
            }
        }
        else {
            handleOpen("error", "Fields have to be filled!");
        }
    }

    return (
        <>
            <CustomizedSnackbars openState={snackbar} onClose={handleClose} />
            <section id="create-project-container" className="m-auto pt-16 pb-12 md:pl-8 lg:pl-0 md:pb-48 w-11/12 h-screen flex flex-col md:block gap-4">
                <article>
                    <div className="hidden md:flex gap-4 justify-end w-11/12">
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
                        <label className="uppercase 2xl:text-xl">Title</label>
                        <p>
                            <input 
                            ref={title}
                            required
                            type="text"
                            maxLength={55}
                            className="bg-gray-200 w-full md:w-11/12 h-10 md:h-12 2xl:h-16 outline-none p-2 focus:border-b-2 border-gray-600 2xl:text-2xl"
                            onChange={() => handleChangeEntered(title, "titleEntered")}/>
                        </p>
                    </div>
                    <div className="text-start 2xl:text-xl">
                        <label className="uppercase">Description</label>
                        <p>
                            <textarea 
                            ref={description}
                            maxLength={500}
                            className="bg-gray-200 w-full md:w-11/12 h-20 md:h-24 2xl:h-36 min-h-24 max-h-72 outline-none p-2  focus:border-b-2 border-gray-600 2xl:text-2xl"
                            onChange={() => handleChangeEntered(description, "descriptionEntered")}/>
                        </p>
                    </div>
                    <div>
                        <div className="text-start 2xl:text-xl">
                            <label className="uppercase">Due date</label>
                            <p>
                                <input 
                                type="date"
                                ref={date} 
                                min={currentDate}
                                max="31.12.9999"
                                required 
                                className="bg-gray-200 w-full md:w-2/4 lg:w-1/4 h-10 md:h-12 outline-none p-2 focus:border-b-2 border-gray-600 2xl:text-2xl"
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