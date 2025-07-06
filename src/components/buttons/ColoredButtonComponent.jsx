export default function ColoredButtonComponent({children, clickEvent}) {
    return (
        <button
        className="py-3 px-8 rounded-lg items-center text-gray-200 bg-black bg-opacity-75 hover:bg-opacity-85 text-base"
        onClick={clickEvent}
        >
        {children}
        </button>
    );
}