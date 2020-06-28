import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const Item = ({ item, index }) => {
  const { title, owner, iteration, effort, tags } = item;

  return (
    <Draggable className='item' key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        const itemStyle = {
          userSelect: 'none',
          padding: 16,
          margin: '0 0 8px 0',
          minHeight: '50px',
          borderLeft: '5px solid skyblue',
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
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
