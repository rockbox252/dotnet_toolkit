import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import FileUpload from './FileUpload';
import Report from './Report';

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Route exact path="/">
          <FileUpload />
        </Route>
        <Route exact path="/report">
          <Report />
        </Route>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
