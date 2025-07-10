export default function TransparentButtonComponent({children, clickEvent}) {
    return (
        <button
        className="mr-2 bg-transparent py-3 px-8 rounded-lg  transform duration-500 hover:bg-gray-100" 
        onClick={clickEvent}
        >
        {children}
        </button>
    );
}