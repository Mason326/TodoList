import CertainProject from "./CertainProject";

export default function AsideComponent({onAdded, yourProjects, changeAppearance}) {
    return (
        <aside className="p-2 mr-12 text-gray-100 font-bold bg-black bg-opacity-95 rounded-tr-lg min-h-0 min-w-0 max-w-72">
            <h1 className="pt-12 uppercase pl-6 pr-24 pb-8">Your Projects</h1>
            <p className="ml-6">
                <button className="p-2 mb-2 rounded-lg items-center text-gray-400 bg-gray-500 bg-opacity-25 hover:bg-opacity-35 text-sm" onClick={() => onAdded(true)}>
                    <span className="p-2 text-base">+</span>
                    <span className="py-2 pr-2 text-base">Add Project</span>
                </button>
            </p>
            <section className="ml-6 min-w-0 min-h-0 m-0">
                <ul>
                    {yourProjects.length > 0 && yourProjects.map(item => <CertainProject key={`${item.titleEntered}_${item.dateEntered}_${Math.random()}`} data={item} replaceMain={changeAppearance} />) }
                </ul>
            </section>
        </aside>
    );  
}