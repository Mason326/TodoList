import image from "../assets/error-message.png"
export default function Message({text}) {
    return (
        <div className="flex bg-red-400 px-6 py-4 absolute rounded items-center gap-2">
            <img src={image} alt="" className="h-8 w-8" />
            <h2 className="text-white uppercase font-semibold">{text}</h2>
        </div>
    );
}