import React, { useState, useContext, useEffect } from 'react';
import ItemContext from '../../context/item/ItemContext';

const ItemForm = () => {
  const itemContext = useContext(ItemContext);

  const { addItem, current, clearCurrent, updateItem } = itemContext;

  useEffect(() => {
    if (current !== null) {
      setItem(current);
    } else {
      setItem({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [itemContext, current]);

  const [item, setItem] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = item;

  const onChange = e => setItem({ ...item, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addItem(item);
    } else {
      updateItem(item);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Item' : 'Add Item'}</h2>
      <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
      <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
      <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
      <h5>Item Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Item' : 'Add Item'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ItemForm;
