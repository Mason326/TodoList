import floppy from "../assets/124-1246578_obsolete-white-save-icon-png.png";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
export default function AsideComponent({onAdded, yourProjects, onVisiblePage, onLocal}) {
    return (
        <aside className="p-2 mr-12 text-gray-100 font-bold bg-black bg-opacity-95 rounded-tr-lg min-w-72 max-w-72 xl:min-w-80 xl:max-w-80 2xl:min-w-96 2xl:max-w-96">
            <div className="sticky top-0">
            <h1 className="pt-12 uppercase pl-6 pr-24 pb-8 xl:text-xl 2xl:text-2xl">Your Projects</h1>
            <p className="ml-4">
                <button className="p-2 mb-2 rounded-lg items-center text-gray-400 bg-gray-500 bg-opacity-25 transform duration-500 hover:bg-opacity-35 hover:text-gray-200 text-sm xl:p-4" onClick={() => onAdded(true)}>
                    <span className="p-2 text-base xl:text-xl font-extrabold">+</span>
                    <span className="py-2 pr-2 text-base xl:text-lg xl:py-4 xl:pr-4 2xl:text-xl">Add Project</span>
                </button>
            </p>
            <section className="ml-4 min-w-0 min-h-0 m-0 xl:mt-2">
                <ul>
                    {yourProjects.length > 0 && yourProjects.map((item) => <li key={`${item.titleEntered}_${item.dateEntered}`} className="text-gray-400 transform duration-500 hover:bg-gray-800 hover:text-gray-200 mr-3">
                        <button className="min-w-full min-h-full text-left p-2 max-w-64 xl:max-w-72" onClick={() => onVisiblePage(yourProjects.indexOf(item))}>
                            <p className="truncate xl:text-lg 2xl:text-xl">{item.titleEntered}</p>
                        </button>
                    </li>) }
                </ul>
            </section>
            <button className="ml-4 p-2 mb-2 rounded-lg items-center text-gray-400 bg-gray-500 bg-opacity-25  transform duration-500 hover:bg-opacity-35 hover:text-gray-200 text-sm my-4" onClick={onLocal}>
                <Tooltip
                    title="Save to Local storage"
                    slots={{
                        transition: Zoom,
                    }}>                
                    <span className="flex justify-between gap-2 items-center xl:gap-3">
                        <img src={floppy} alt="floppy" className="ml-2 w-[1.5rem] h-[1.5rem] xl:w-[2rem] xl:h-[2rem]"/>
                        <p className="py-2 pr-2 text-base xl:text-lg xl:py-3 xl:pr-3 2xl:text-xl">Save changes</p>
                    </span>
                </Tooltip>
            </button>
            </div>
        </aside>
    );  
}