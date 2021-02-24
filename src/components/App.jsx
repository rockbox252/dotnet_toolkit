import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import FileUpload from './FileUpload';

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Route path="/">
          <FileUpload />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
