import React from "react"

// import assets and styles
import "./modal.styles.scss"

const Modal = ({ isVisible = false, children }) => {
    return (
        <>
            {
                isVisible &&
                <div className="modal-component">
                    {children}
                </div>
            }
        </>
    )
}

export default Modal