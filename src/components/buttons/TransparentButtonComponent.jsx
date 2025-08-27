export default function TransparentButtonComponent({children, clickEvent}) {
    return (
        <button
        className="lg:block w-full lg:w-auto mr-2 bg-transparent py-3 px-8 rounded-lg border transform duration-500 text-xl lg:text-base 2xl:text-xl hover:bg-gray-100" 
        onClick={clickEvent}
        >
        {children}
        </button>
    );
}