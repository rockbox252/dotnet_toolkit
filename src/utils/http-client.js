import axios from 'axios';

export default axios.create({
  //  Change baseURL to the Web API's URL
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  },
});
