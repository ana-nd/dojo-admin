import ReactDOM from "react-dom";
import closeIcon from "../../assets/icons/close.svg";
import "./styles.css";

const Modal = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <img src={closeIcon} className="close-button" onClick={onClose}
           />
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">{actions}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
