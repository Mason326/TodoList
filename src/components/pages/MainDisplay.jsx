import projects from "../../assets/no-projects.png";
export default function MainDisplay({onAdded}) {
    return (
        <section id="main-container" className="p-6 items-center text-center min-w-max mx-auto my-48">
            <img className="size-32 md:size-24 mx-auto m-4" src={projects} alt="Projects draft"/>
            <h2 className="text-stone-600 md:text-xl text-2xl font-bold m-5">No Projects Selected</h2>
            <p className="text-stone-400 mb-10 text-lg">Select a project or get started with a new one</p>
            <p>
                <button className="p-4 rounded-lg text-gray-100 bg-black bg-opacity-75 transform duration-500 hover:bg-opacity-85 hover:text-white text-lg md:text-base md:p-2.5 font-medium" onClick={() => onAdded(true)}>Create new project</button>
            </p>
        </section>
    );
}