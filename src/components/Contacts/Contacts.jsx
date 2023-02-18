import React, { useMemo } from 'react';
import css from './Contacts.module.css';
import PropTypes from 'prop-types';
import { ContactsItem } from 'components/ContactsItem/ContacsItem';

export const Contacts = props => {
  const { data, handleInput, handleDelete } = props;

  return (
    <div className={css.box}>
      <h2 className={css.title}>Contacts</h2>
      <p className={css.description}>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        onChange={handleInput}
        className={css.input}
      />
      <ul>
        {data.map(element => {
          return (
            <ContactsItem
              key={element.id}
              name={element.name}
              number={element.number}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div>
  );
};

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
