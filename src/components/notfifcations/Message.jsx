import image from "../../assets/error-message.png"
import saved from "../../assets/saved.png"
export default function Message({text, isSaving=false}) {
    let color = "bg-red-400";
    let imageHolder=image;
    let position="";
    if(isSaving) {
        color = "bg-green-400";
        imageHolder=saved;
        position="right-4 top-12"
    }
    const classes = `flex ${color} px-6 py-4 absolute rounded items-center gap-2 mr-2 ${position} `;
    return (
        <div className={classes}>
            <img src={imageHolder} alt="" className="h-8 w-8" />
            <h2 className="text-white uppercase font-semibold">{text}</h2>
        </div>
    );
}