import {
  GET_COLUMNS,
  ADD_COLUMN,
  DELETE_COLUMN,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COLUMN,
  FILTER_COLUMNS,
  CLEAR_FILTER,
  COLUMN_ERROR,
  CLEAR_COLUMNS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COLUMNS:
      return {
        ...state,
        columns: action.payload,
        loading: false,
      };
    case ADD_COLUMN:
      return {
        ...state,
        columns: [action.payload, ...state.columns],
        loading: false,
      };
    case UPDATE_COLUMN:
      return {
        ...state,
        columns: state.columns.map(column =>
          column._id === action.payload._id ? action.payload : column
        ),
        loading: false,
      };
    case DELETE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter(column => column._id !== action.payload),
        loading: false,
      };
    case CLEAR_COLUMNS:
      return {
        ...state,
        columns: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_COLUMNS:
      return {
        ...state,
        filtered: state.columns.filter(column => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return column.title.match(regex) || column.description.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case COLUMN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
