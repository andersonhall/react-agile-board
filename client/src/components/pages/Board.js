import React, { useContext, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Spinner from '../layout/Spinner';
import Column from '../layout/Column';
import ColumnContext from '../../context/column/ColumnContext';

const Board = () => {
  const columnContext = useContext(ColumnContext);
  const { columns, getColumns, updateColumn, loading } = columnContext;

  useEffect(() => {
    getColumns();
    // eslint-disable-next-line
  }, []);

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(c => c._id === source.droppableId);
      const destColumn = columns.find(c => c._id === destination.droppableId);
      const sourceItems = sourceColumn.items;
      const destItems = destColumn.items;
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      updateColumn(sourceColumn);
      updateColumn(destColumn);
    } else {
      const column = columns.find(c => c._id === source.droppableId);
      const copieditems = column.items;
      const [removed] = copieditems.splice(source.index, 1);
      copieditems.splice(destination.index, 0, removed);

      updateColumn(column);
    }
  };

  return (
    <div className='board'>
      {columns == null || loading ? (
        <Spinner />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([id, column]) => {
            return <Column key={id} id={column._id} column={column} />;
          })}
        </DragDropContext>
      )}
    </div>
  );
};

export default Board;
