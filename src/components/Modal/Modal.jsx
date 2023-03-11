import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
const { picture, onClose } = props;

useEffect(() => {
window.addEventListener('keydown', handleKeyDown);

return () => {
  window.removeEventListener('keydown', handleKeyDown);
};
});

const handleKeyDown = e => {
if (e.code === 'Escape') {
onClose();
}
};

const handleBackdropClick = event => {
if (event.target === event.currentTarget) {
onClose();
}
};

const { largeImageURL, tags } = picture;

return createPortal(
<div className={css.overlay} onClick={handleBackdropClick}>
<div className={css.modal}>
<img src={largeImageURL} alt={tags} />
</div>
</div>,
modalRoot
);
}