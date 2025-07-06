import { createPortal } from "react-dom";
import close from "../../assets/close.svg"
import { forwardRef, useImperativeHandle, useRef } from "react";
import ColoredButtonComponent from "../buttons/ColoredButtonComponent";
import TransparentButtonComponent from "../buttons/TransparentButtonComponent";
const ModalComponent = forwardRef(function ModalComponent({projectName, deleteHandle}, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });


    return createPortal (
        <dialog ref={dialog} className="rounded-lg box-border shadow-lg ">
            <form method="dialog">
                <div className="w-auto h-12 bg-black bg-opacity-75 text-right">
                    <button className="px-4 py-4">
                        <img src={close} alt="close" className="w-4 h-4 transform duration-500 hover:rotate-180 "/>
                    </button>
                </div>
                <div className="pt-8 px-12 pb-8 w-[30rem]">
                    <hr className="h-2" />
                    <h2 className="font-semibold text-2xl text-center font-mono my-2 text-gray-700">Delete this project?</h2>
                    <p className="text-center">The project '{projectName}' will be deleted without the possibility of return</p>
                    <hr className="h-2 mb-10 mt-4" />
                    <div className="flex justify-evenly items-center">
                        <ColoredButtonComponent clickEvent={deleteHandle}>Yes</ColoredButtonComponent>
                        <TransparentButtonComponent>No</TransparentButtonComponent>
                    </div>
                </div>
            </form>
        </dialog>
    , document.getElementById("msg"));
});

export default ModalComponent;