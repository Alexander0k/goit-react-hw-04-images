import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, tags, onClick, object }) => {
  return (
    <li className={css.imageGalleryItem} onClick={() => onClick(object)}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItem__image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
