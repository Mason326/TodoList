import logout from "../assets/logoutIcon.svg";
import add from "../assets/addIcon.svg"
import menu from "../assets/menuIcon.svg";
import VirtualizedList from "../components//list/VirtualizedList"
import { useNavigate } from "react-router";
import { useState } from "react";
import AlertDialog from "./notfifcations/modal/AlertDialog";

export default function AsideComponent({onAdded, onLogout, showAside, setShowAside}) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const navigate = useNavigate();

    const logOutUser = () => {
        onLogout()
        setTimeout(() =>
            navigate("/signIn", {replace: true})
        , 1000)
    };


    let initialClassesAside = "p-2 mr-12 text-gray-100 font-bold bg-black bg-opacity-95 rounded-tr-lg min-w-72 max-w-72 2xl:min-w-96 2xl:max-w-96 fixed lg:relative min-h-full z-10 hidden lg:block"
    if(!showAside) 
        initialClassesAside+=" hidden"
    else
        initialClassesAside = initialClassesAside.replace("hidden", "block");
    const classes = initialClassesAside;
    return (
        <>
        <AlertDialog openDial={openDialog} onClose={handleClose} onSubmit={logOutUser} />
        <aside className={classes}>
            <button className="block lg:hidden px-2 pb-2 fixed" onClick={() => setShowAside(prev => !prev)}>
                <img src={menu} alt="menu-Icon" className="size-14" />
            </button>
            <h1 className="pt-24 lg:pt-12 2xl:text-xl uppercase pl-6 pr-24 2xl:pr-32 pb-8 text-lg">Your Projects</h1>
            <p className="ml-6">
                <button className="px-5 py-3 md:p-2 2xl:p-4 mb-2 rounded-lg items-center text-gray-400 bg-gray-500 bg-opacity-25 transform duration-500 hover:bg-opacity-35 hover:text-gray-200 flex" onClick={() => onAdded(true)}>
                    <img src={add} alt="+" className="w-[1.5rem] h-[1.5rem] mr-2" />
                    <span className="py-2 pr-4 2xl:pr-6 text-xl md:text-base 2xl:text-xl">Add Project</span>
                </button>
            </p>
            <section className="ml-6 min-w-0 min-h-0 m-0">
                <VirtualizedList />
            </section>
            <button className="px-5 py-3 md:p-2 rounded-lg items-center text-gray-400 bg-transparent transform duration-500 hover:bg-opacity-35 hover:text-gray-200 text-sm fixed bottom-3 left-3" onClick={() => handleClickOpen()}>
                <span className="flex justify-between gap-2 items-center">
                    <img src={logout} alt="logout" className="ml-2 w-[2rem] h-[2rem] md:w-[1.5rem] md:h-[1.5rem] 2xl:w-[2.3rem] 2xl:h-[2.3rem]"/>
                    <p className="py-2 pr-2 2xl:py-4 2xl:pr-8 text-xl md:text-base lg:text-xl">LogOut</p>
                </span>
            </button>
        </aside>
        </>
    );  
}