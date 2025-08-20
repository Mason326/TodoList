export default function ColoredButtonComponent({children, clickEvent}) {
    return (
        <button
        className="w-full md:w-auto font-semibold md:font-normal py-3 px-8 rounded-lg items-center text-gray-200 bg-black bg-opacity-75 transform duration-500 hover:bg-opacity-85 text-xl md:text-base"
        onClick={clickEvent}
        >
        {children}
        </button>
    );
}