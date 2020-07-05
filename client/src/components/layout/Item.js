import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import ItemContext from '../../context/item/ItemContext';
import Modal from '../layout/Modal';
import ItemForm from '../../components/items/ItemForm';

const Item = ({ item, index }) => {
  const { _id, title, owner, iteration, effort, tags } = item;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemContext = useContext(ItemContext);
  const { current, setCurrent } = itemContext;

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDoubleClick = item => {
    setIsModalOpen(true);
    setCurrent(item);
  };

  return (
    <div>
      <Draggable className='item' key={_id} draggableId={_id} index={index}>
        {(provided, snapshot) => {
          const itemStyle = {
            userSelect: 'none',
            padding: 16,
            margin: '0 0 8px 0',
            minHeight: '50px',
            borderLeft: '6px solid skyblue',
            backgroundColor: snapshot.isDragging ? '#ccc' : '#eee',
            color: '#333',
            ...provided.draggableProps.style,
          };
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={itemStyle}
              onDoubleClick={() => handleDoubleClick(item)}
            >
              <p>
                <strong>{title}</strong>
              </p>
              <p>{owner}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Iteration:</p>
                <p>{iteration}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Effort:</p>
                <p>{effort}</p>
              </div>
              <div style={{ display: 'flex' }}>
                {tags.map((tag, index) => (
                  <div className='badge badge-dark' key={index}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Draggable>
      {isModalOpen && (
        <Modal onModalClose={handleModalClose}>
          <Modal.Body>
            <ItemForm onModalClose={handleModalClose} />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Footer.CloseBtn>Cancel</Modal.Footer.CloseBtn>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
