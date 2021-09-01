import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

    return createPortal(
      <div className="Overlay" onClick={handleBackdrop}>
        <div className="Modal">
          {children}
        </div>
      </div>,
      modalRoot,
    )
  }