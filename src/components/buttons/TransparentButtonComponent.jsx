export default function TransparentButtonComponent({children, clickEvent}) {
    return (
        <button
        className="w-full md:w-auto mr-2 bg-transparent py-3 px-8 rounded-lg border transform duration-500 text-xl md:text-base hover:bg-gray-100" 
        onClick={clickEvent}
        >
        {children}
        </button>
    );
}