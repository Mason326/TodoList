export default function ColoredButtonComponent({children, clickEvent}) {
    return (
        <button
        className="w-full lg:w-auto font-semibold lg:font-normal py-3 px-8 rounded-lg items-center text-gray-200 bg-black bg-opacity-75 transform duration-500 hover:bg-opacity-85 text-xl lg:text-base 2xl:text-xl"
        onClick={clickEvent}
        >
        {children}
        </button>
    );
}