import floppy from "../assets/124-1246578_obsolete-white-save-icon-png.png";
export default function AsideComponent({onAdded, yourProjects, onVisiblePage, onLocal}) {
    return (
        <aside className="p-2 mr-12 text-gray-100 font-bold bg-black bg-opacity-95 rounded-tr-lg min-w-72 max-w-72">
            <h1 className="pt-12 uppercase pl-6 pr-24 pb-8">Your Projects</h1>
            <p className="ml-6">
                <button className="p-2 mb-2 rounded-lg items-center text-gray-400 bg-gray-500 bg-opacity-25 transform duration-500 hover:bg-opacity-35 hover:text-gray-200 text-sm" onClick={() => onAdded(true)}>
                    <span className="p-2 text-base">+</span>
                    <span className="py-2 pr-2 text-base">Add Project</span>
                </button>
            </p>
            <section className="ml-6 min-w-0 min-h-0 m-0">
                <ul>
                    {yourProjects.length > 0 && yourProjects.map((item) => <li key={`${item.titleEntered}_${item.dateEntered}`} className="text-gray-400 transform duration-500 hover:bg-gray-800 hover:text-gray-200 mr-4">
                        <button className="min-w-full min-h-full text-left p-2 max-w-64" onClick={() => onVisiblePage(yourProjects.indexOf(item))}>
                            <p className="overflow-ellipsis">{item.titleEntered}</p>
                        </button>
                    </li>) }
                </ul>
            </section>
            <div className="flex justify-center">
                <button className="p-2 mb-2 rounded-lg items-center text-gray-400 bg-gray-500 bg-opacity-25  transform duration-500 hover:bg-opacity-35 hover:text-gray-200 text-sm my-4" onClick={onLocal}>
                    <span className="flex justify-between gap-2 items-center">
                        <img src={floppy} alt="floppy" className="ml-2 w-[1.5rem] h-[1.5rem]"/>
                        <p className="py-2 pr-2 text-base">Save projects</p>
                    </span>
                </button>
            </div>
        </aside>
    );  
}