import React, { useEffect, useMemo, useState } from 'react';
import { Sheet } from './Sheet/Sheet';
import { Contacts } from './Contacts/Contacts';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import { getStorage, saveStorage } from '../utils/utils.js';

export const App = () => {
  const [contact, setContact] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContact(getStorage('contacts'));
  }, []);

  useEffect(() => {
    if (contact?.length) {
      saveStorage('contacts', contact);
    }
  }, [contact, filter]);

  const filteredData = useMemo(
    () =>
      contact.filter(element =>
        element.name.toLowerCase().startsWith(filter.toLowerCase())
      ),
    [contact, filter]
  );

  const handleInput = event => {
    const {
      target: { value },
    } = event;
    setFilter(value);
  };

  const handleDelete = event => {
    event.preventDefault();
    const data = contact.filter(
      element => element.name !== event.target.dataset.name
    );
    const nameOfDeleteItem = contact.filter(
      element => element.name === event.target.dataset.name
    );
    console.log();
    alert(`${nameOfDeleteItem[0].name} has been deleted `);
    setContact(data);
  };

  const hadnleAdd = event => {
    const {
      name: { value: text },
      number: { value: num },
    } = event.currentTarget.elements;

    event.preventDefault();

    const nameTaken = contact.some(elements => elements.name === text);
    const numberTaken = contact.some(elements => elements.number === num);
    if (nameTaken && numberTaken) {
      return alert(`${text} is alredy in Phonebook`);
    }
    const objectToAdd = {
      id: nanoid(),
      name: text,
      number: num,
    };

    setContact(prevState => [...prevState, objectToAdd]);
  };

  return (
    <div className={css.container}>
      <Sheet handleAdd={hadnleAdd} />
      <Contacts
        data={filteredData}
        filter={filter}
        handleInput={handleInput}
        handleDelete={handleDelete}
      />
    </div>
  );
};
