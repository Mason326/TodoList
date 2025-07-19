export default function ColoredButtonComponent({children, clickEvent}) {
    return (
        <button
        className="py-3 px-8 rounded-lg items-center text-gray-200 bg-black bg-opacity-75  transform duration-500 hover:bg-opacity-85 text-base xl:text-xl xl:py-4 xl:px-12 2xl:text-2xl"
        onClick={clickEvent}
        >
        {children}
        </button>
    );
}