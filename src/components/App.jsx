import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import FileUpload from './FileUpload';
import Report from './Report';
import IFrame from './IFrame';

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
        <Route exact path="/report/html">
          <IFrame />
        </Route>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
