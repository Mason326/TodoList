import { createPortal } from "react-dom";
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
        <dialog ref={dialog} className="p-12 rounded-lg  border-b-gray-600 border-b-4 w-[30rem]">
            <div className="flex text-right">
                <p className="">+</p>
            </div>
            <div>
                <hr className="h-2" />
                <h2 className="font-semibold text-2xl text-center font-mono my-2 text-gray-700">Delete this project?</h2>
                <p className="mb-12 text-center">The project '{projectName}' will be deleted without the possibility of return</p>
                <form method="dialog" className="flex justify-evenly items-center">
                    <ColoredButtonComponent clickEvent={deleteHandle}>Yes</ColoredButtonComponent>
                    <TransparentButtonComponent>No</TransparentButtonComponent>
                </form>
            </div>
        </dialog>
    , document.getElementById("msg"));
});

export default ModalComponent;