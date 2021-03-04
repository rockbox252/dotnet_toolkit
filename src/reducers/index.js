import { combineReducers } from 'redux';
import { GENERATE_REPORT } from '../actions/types';

const reducer = (state = null, action) => {
  switch (action.type) {
    case GENERATE_REPORT: {
      const { path, data } = action.payload;
      console.log(data, path);
      return { ...state, projectPath: path, report: data };
    }
    default:
      return { ...state };
  }
};

export default combineReducers({
  app: reducer,
});
