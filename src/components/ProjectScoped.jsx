import {createPortal } from "react-dom";
export default function ProjectScoped({verbose}) {
    // console.log("project works");
    console.log(verbose.titleEntered);
    return createPortal(
        <section>
            <h1>{verbose.titleEntered}</h1>
            <p>{verbose.dateEntered}</p>
            <p>{verbose.descriptionEntered}</p>
        </section>
    , document.getElementById("app-container"));
}