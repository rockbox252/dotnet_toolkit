import axios from 'axios';
import { GENERATE_REPORT } from './types';

export const generateReport = (path, reportType) => async dispatch => {
  const { data } = await axios.post(
    `http://localhost:5000/api/v1/analyze/${reportType}`,
    {
      path,
    }
  );
  dispatch({ type: GENERATE_REPORT, payload: { data, path } });
};

// https://localhost:44302
