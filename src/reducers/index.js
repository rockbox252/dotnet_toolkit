import { combineReducers } from 'redux';
import { GENERATE_REPORT } from '../actions/types';

const reducer = (state = null, action) => {
  switch (action.type) {
    case GENERATE_REPORT: {
      const { path, data, reportType } = action.payload;
      // console.log(data, path);
      if (reportType === 'html')
        return { ...state, projectPath: path, report: data };

      if (reportType === 'json')
        return { ...state, projectPath: path, jsonReport: data };

      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default combineReducers({
  app: reducer,
});
