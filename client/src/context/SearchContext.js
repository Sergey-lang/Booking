import { createContext, useReducer } from 'react';
import { RESET_SEARCH, SEARCH } from '../constant/actions';

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined
  }
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case SEARCH: {
      return action.payload;
    }
    case RESET_SEARCH: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  const contextData = {
    city: state.city,
    dates: state.dates,
    options: state.options,
    dispatch,
  };

  return (
    <SearchContext.Provider value={contextData}>
      {children}
    </SearchContext.Provider>
  );
};
