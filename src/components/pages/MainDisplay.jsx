import projects from "../../assets/no-projects.png";
export default function MainDisplay({onAdded}) {
    return (
        <section id="main-container" className="p-6 items-center text-center min-w-max mx-auto my-48">
            <img className="size-24 mx-auto m-4" src={projects} alt="Projects draft"/>
            <h2 className="text-stone-600 text-xl font-bold m-3">No Projects Selected</h2>
            <p className="text-stone-400 mb-10">Select a project or get started with a new one</p>
            <p>
                <button className="p-2.5 rounded-lg text-gray-300 bg-black bg-opacity-75 hover:bg-opacity-85 text-base" onClick={() => onAdded(true)}>Create new project</button>
            </p>
        </section>
    );
}