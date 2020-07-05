import React, { useState, useContext, useEffect } from 'react';
import ItemContext from '../../context/item/ItemContext';
import ColumnContext from '../../context/column/ColumnContext';

const ItemForm = ({ onModalClose }) => {
  const itemContext = useContext(ItemContext);
  const columnContext = useContext(ColumnContext);

  const { addItem, current, clearCurrent, updateItem, deleteItem } = itemContext;
  const { getColumns } = columnContext;

  useEffect(() => {
    if (current !== null) {
      setItem(current);
    } else {
      setItem({
        title: '',
        description: '',
        owner: '',
        iteration: '',
        effort: '',
        tags: [],
      });
    }
  }, [itemContext, current]);

  const [item, setItem] = useState({
    title: '',
    description: '',
    owner: '',
    iteration: '',
    effort: '',
    tags: [],
  });

  const { title, description, owner, iteration, effort, tags } = item;

  const onChange = e => setItem({ ...item, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (current === null) {
      await addItem(item);
    } else {
      await updateItem(item);
    }
    clearAll();
    onModalClose();
    getColumns();
  };

  const handleDelete = async e => {
    e.preventDefault();
    await deleteItem(current._id);
    clearAll();
    onModalClose();
    getColumns();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form className='item-form' autoComplete='off'>
      <h2 className='text-primary'>{current ? 'Edit Item' : 'Add Item'}</h2>
      <label htmlFor='title'>Title</label>
      <input
        className='item-form-title'
        type='text'
        name='title'
        value={title}
        onChange={onChange}
        required
      />

      <label htmlFor='description'>Description</label>
      <textarea
        className='item-form-description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <label htmlFor='owner'>Owner</label>
      <input
        className='item-form-owner'
        type='text'
        name='owner'
        value={owner}
        onChange={onChange}
      />
      <label htmlFor='iteration'>Iteration</label>
      <input
        className='item-form-iteration'
        type='text'
        name='iteration'
        value={iteration}
        onChange={onChange}
      />
      <label htmlFor='effort'>Effort</label>
      <input
        className='item-form-effort'
        type='text'
        name='effort'
        value={effort}
        onChange={onChange}
      />
      <label htmlFor='tags'>Tags</label>
      <input className='item-form-tags' type='text' name='tags' value={tags} onChange={onChange} />
      {current ? (
        <div>
          <button type='submit' onClick={handleSubmit} value='update' className='btn btn-success'>
            Update Item
          </button>
          <button type='submit' onClick={handleDelete} value='delete' className='btn btn-danger'>
            Delete Item
          </button>
        </div>
      ) : (
        <button type='submit' onClick={handleSubmit} className='btn btn-success'>
          Add item
        </button>
      )}
    </form>
  );
};

export default ItemForm;
