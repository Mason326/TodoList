import floppy from "../assets/saveIcon.svg";
import add from "../assets/addIcon.svg"
import menu from "../assets/menuIcon.svg";
import VirtualizedList from "./list/VirtualizedList";

export default function AsideComponent({onAdded, onLocal, showAside, setShowAside}) {
    let initialClassesAside = "p-2 mr-12 text-gray-100 font-bold bg-black bg-opacity-95 rounded-tr-lg min-w-72 max-w-72 fixed md:relative min-h-full z-10 hidden md:block"
    if(!showAside) 
        initialClassesAside+=" hidden"
    else
        initialClassesAside = initialClassesAside.replace("hidden", "block");
    const classes = initialClassesAside;
    return (
        <aside className={classes}>
            <button className="block md:hidden px-2 pb-2 fixed" onClick={() => setShowAside(prev => !prev)}>
                <img src={menu} alt="menu-Icon" className="size-14" />
            </button>
            <h1 className="pt-24 md:pt-12 uppercase pl-6 pr-24 pb-8 text-lg">Your Projects</h1>
            <p className="ml-6">
                <button className="px-5 py-3 md:p-2 mb-2 rounded-lg items-center text-gray-400 bg-gray-500 bg-opacity-25 transform duration-500 hover:bg-opacity-35 hover:text-gray-200 flex" onClick={() => onAdded(true)}>
                    <img src={add} alt="+" className="w-[1.5rem] h-[1.5rem] mr-2" />
                    <span className="py-2 pr-4 text-xl md:text-base">Add Project</span>
                </button>
            </p>
            <section className="ml-6 min-w-0 min-h-0 m-0">
                <VirtualizedList />
            </section>
            <button className="ml-6 px-5 py-3 md:p-2 mb-2 rounded-lg items-center text-gray-400 bg-gray-500 bg-opacity-25 transform duration-500 hover:bg-opacity-35 hover:text-gray-200 text-sm my-4" onClick={onLocal}>
                <span className="flex justify-between gap-2 items-center">
                    <img src={floppy} alt="floppy" className="ml-2 w-[2rem] h-[2rem] md:w-[1.5rem] md:h-[1.5rem]"/>
                    <p className="py-2 pr-2 text-xl md:text-base">Save changes</p>
                </span>
            </button>
        </aside>
    );  
}