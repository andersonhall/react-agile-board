import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import Item from './Item';

const Column = ({ id, column }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }}
  >
    <div
      style={{
        width: '100%',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h2>{column.name}</h2>
      {column.name === 'New' && (
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
      <Droppable droppableId={id} key={id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? '#a4a4a4' : 'lightgrey',
                padding: 4,
                width: 250,
                minHeight: 'calc(100vh - 7rem)',
              }}
            >
              {column.items.map((item, index) => {
                return <Item key={item.id} item={item} index={index} />;
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
