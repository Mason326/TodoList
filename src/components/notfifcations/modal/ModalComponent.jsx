import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
const ModalComponent = forwardRef(function ModalComponent({children}, ref) {
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
                {children}
            </form>
        </dialog>
    , document.getElementById("msg"));
});

export default ModalComponent;