import React, { useReducer } from 'react';
import axios from 'axios';
import ColumnContext from './ColumnContext';
import columnReducer from './columnReducer';
import {
  GET_COLUMNS,
  CLEAR_COLUMNS,
  ADD_COLUMN,
  DELETE_COLUMN,
  COLUMN_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COLUMN,
  FILTER_COLUMNS,
  CLEAR_FILTER,
} from '../types';

const ColumnState = props => {
  const initialState = {
    columns: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(columnReducer, initialState);

  // Get Columns
  const getColumns = async () => {
    try {
      const res = await axios.get('/api/columns');
      dispatch({ type: GET_COLUMNS, payload: res.data });
    } catch (err) {
      dispatch({ type: COLUMN_ERROR, payload: err.response.msg });
    }
  };

  // Add Column
  const addColumn = async column => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/columns', column, config);
      dispatch({ type: ADD_COLUMN, payload: res.data });
    } catch (err) {
      dispatch({ type: COLUMN_ERROR, payload: err.response.msg });
    }
  };

  // Delete Column
  const deleteColumn = async id => {
    try {
      await axios.delete(`/api/columns/${id}`);
      dispatch({ type: DELETE_COLUMN, payload: id });
    } catch (err) {
      dispatch({ type: COLUMN_ERROR, payload: err.response.msg });
    }
  };

  // Update Column
  const updateColumn = async column => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/columns/${column._id}`, column, config);
      dispatch({ type: UPDATE_COLUMN, payload: res.data });
    } catch (err) {
      dispatch({ type: COLUMN_ERROR, payload: err.response.msg });
    }
  };

  // Clear All Columns
  const clearColumns = () => {
    dispatch({ type: CLEAR_COLUMNS });
  };

  // Set Current Column
  const setCurrent = column => {
    dispatch({ type: SET_CURRENT, payload: column });
  };

  // Clear Current Column
  const clearCurrent = column => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Columns
  const filterColumns = text => {
    dispatch({ type: FILTER_COLUMNS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ColumnContext.Provider
      value={{
        columns: state.columns,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getColumns,
        addColumn,
        deleteColumn,
        setCurrent,
        clearCurrent,
        updateColumn,
        filterColumns,
        clearFilter,
        clearColumns,
      }}
    >
      {props.children}
    </ColumnContext.Provider>
  );
};

export default ColumnState;
