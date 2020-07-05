import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import Item from './Item';

const Column = ({ id, column }) => (
  <div className='column'>
    <div className='column-header'>
      <h3 className='column-title' style={{ margin: '0.4rem 0' }}>
        {column.title}
      </h3>
      {column.title === 'New' && (
        <div
          className='btn btn-primary btn-sm m-1'
          onClick={handleClick}
          style={{ display: 'inline-block', margin: '0', userSelect: 'none' }}
        >
          <i className='fas fa-plus' /> Add Item
        </div>
      )}
    </div>
    <div style={{ margin: 5 }}>
      <Droppable droppableId={column._id} key={column._id} style={{ margin: 5 }}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? '#a4a4a4' : 'lightgrey',
                padding: 4,
                width: 240,
                minHeight: 'calc(100vh - 7rem)',
              }}
            >
              {column.items.map((item, index) => {
                return <Item key={item._id} item={item} index={index} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  </div>
);

const handleClick = () => console.log('clicked'); // TODO: handleClick

Column.propTypes = {
  column: PropTypes.object.isRequired,
};

export default Column;
