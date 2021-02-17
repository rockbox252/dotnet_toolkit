import { combineReducers } from 'redux';

const reducer = (state = null, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default combineReducers({
  app: reducer,
});
