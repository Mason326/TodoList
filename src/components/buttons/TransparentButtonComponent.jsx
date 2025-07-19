export default function TransparentButtonComponent({children, clickEvent}) {
    return (
        <button
        className="mr-2 bg-transparent py-3 px-8 rounded-lg  transform duration-500 hover:bg-gray-100 xl:text-xl xl:py-4 xl:px-12 2xl:text-2xl" 
        onClick={clickEvent}
        >
        {children}
        </button>
    );
}