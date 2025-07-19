import projects from "../../assets/no-projects.png";
export default function MainDisplay({onAdded}) {
    return (
        <section id="main-container" className="p-6 items-center text-center min-w-max mx-auto my-48">
            <img className="size-24 mx-auto m-4 xl:size-32" src={projects} alt="Projects draft"/>
            <h2 className="text-stone-600 text-xl font-bold m-3 xl:text-2xl">No Projects Selected</h2>
            <p className="text-stone-400 mb-10 xl:text-xl">Select a project or get started with a new one</p>
            <p>
                <button className="p-2.5 rounded-lg text-gray-200 bg-black bg-opacity-75 transform duration-500 hover:bg-opacity-85 hover:text-white text-base font-medium xl:p-3.5" onClick={() => onAdded(true)}>
                    <span className="xl:text-xl">Create new project</span>
                </button>
            </p>
        </section>
    );
}