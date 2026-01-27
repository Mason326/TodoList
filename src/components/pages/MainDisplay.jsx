import projects from "../../assets/no-projects.png";
export default function MainDisplay({onAdded}) {
    return (
        <section id="main-container" className="p-6 items-center text-center min-w-max mx-auto my-auto">
            <img className="size-32 lg:size-24 2xl:size-36 mx-auto m-4" src={projects} alt="Projects draft"/>
            <h2 className="text-stone-600 lg:text-xl text-2xl 2xl:text-2xl font-bold m-5">No Projects Selected</h2>
            <p className="text-stone-400 mb-10 text-lg 2xl:text-xl">Select a project or get started with a new one</p>
            <p>
                <button className="p-4 2xl:px-8 2xl:py-4 rounded-lg text-gray-100 bg-black bg-opacity-75 transform duration-500 hover:bg-opacity-85 hover:text-white text-lg lg:text-base 2xl:text-xl lg:p-2.5 font-medium" onClick={() => onAdded(true)}>Create new project</button>
            </p>
        </section>
    );
}