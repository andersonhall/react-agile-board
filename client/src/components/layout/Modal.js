import React from 'react';
import ReactDOM from 'react-dom';

const modalContext = React.createContext();

const Modal = ({ children, onModalClose }) => {
  return ReactDOM.createPortal(
    <div className='modal-container' role='dialog' aria-modal='true'>
      <div className='modal-content'>
        <modalContext.Provider value={{ onModalClose }}>{children}</modalContext.Provider>
      </div>
    </div>,
    document.body
  );
};

Modal.Header = function ModalHeader(props) {
  const { onModalClose } = React.useContext(modalContext);

  return (
    <div className='modal-header'>
      {props.children}
      <button className='cross-btn' title='close modal' onClick={onModalClose}>
        <i className='fa fas-close'></i>
      </button>
    </div>
  );
};

Modal.Body = function ModalBody(props) {
  return <div className='modal-body'>{props.children}</div>;
};

Modal.Footer = function ModalFooter(props) {
  return <div className='modal-footer'>{props.children}</div>;
};

Modal.Footer.CloseBtn = function CloseBtn(props) {
  const { onModalClose } = React.useContext(modalContext);
  return (
    <button {...props} className='btn btn-danger' title='close modal' onClick={onModalClose} />
  );
};

export default Modal;
