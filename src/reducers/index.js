import { combineReducers } from 'redux';

import { GENERATE_REPORT, CLEAR_REPORT, SEARCH_NUGET } from '../actions/types';

const reducer = (state = null, action) => {
  switch (action.type) {
    case GENERATE_REPORT: {
      const { path, data, reportType } = action.payload;
      // console.log(data, path);
      if (reportType === 'html')
        return { ...state, projectPath: path, report: data };

      if (reportType === 'json')
        return { ...state, projectPath: path, jsonReport: data };
      if (reportType === 'excel')
        return { ...state, projectPath: path, excelReport: true };

      return { ...state };
    }
    case CLEAR_REPORT: {
      return null;
    }
    case SEARCH_NUGET: {
      if (state.nugetRes) state.nugetRes.push(action.payload);
      else {
        state.nugetRes = [];
        state.nugetRes.push(action.payload);
      }

      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default combineReducers({
  app: reducer,
});
