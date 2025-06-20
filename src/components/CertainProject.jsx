import { useState } from "react";
import ProjectScoped from "./ProjectScoped";

export default function CertainProject({data, replaceMain}) {
    const [click, setClicked ] = useState(false);

    function handleAddVerbose() {
        replaceMain(false);
        setClicked(true);
    }
    return(
        <>
            <li className="p-2 text-gray-400 hover:bg-gray-800 mr-4">
                <button onClick={handleAddVerbose} className="box-border w-full text-left pl-2 truncate min-w-0">
                    {data.titleEntered}
                </button>
            </li>
            {click && <ProjectScoped verbose={data}/>}
        </>
    );
}