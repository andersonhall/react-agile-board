import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import data from '../../data/data.json';

import Column from '../layout/Column';
import ColumnContext from '../../context/column/ColumnContext';

const Board = () => {
  const columnContext = useContext(ColumnContext);
  const { columns, getColumns } = columnContext;

  useEffect(() => {
    getColumns();
  }, []);

  console.log(columns);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copieditems = [...column.items];
      const [removed] = copieditems.splice(source.index, 1);
      copieditems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copieditems,
        },
      });
    }
  };

  return (
    <div className='board'>
      <DragDropContext onDragEnd={() => {}}>
        {Object.entries(columns).map(([id, column]) => {
          return <Column key={id} id={id} column={column} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default Board;
