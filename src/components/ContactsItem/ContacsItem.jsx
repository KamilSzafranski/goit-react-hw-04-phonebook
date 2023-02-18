import React from 'react';
import css from './ContactsItem.module.css';
import PropTypes from 'prop-types';

export const ContactsItem = ({ name, number, handleDelete }) => {
  return (
    <li className={css.item}>
      <span>{name}:</span>
      <span> {number}</span>
      <button data-name={name} className={css.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

ContactsItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
};
