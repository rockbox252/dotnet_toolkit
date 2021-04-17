import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import FileUpload from './FileUpload';
import Report from './Report';
import IFrame from './IFrame';
import Estimation from './Estimation';
import Migration from './Migration';
import SearchNuGet from './SearchNuGet';

const App = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Header tabValue={tabValue} setTabValue={setTabValue} />
        <Route exact path="/">
          <FileUpload />
        </Route>
        <Route exact path="/report">
          <Report />
        </Route>
        <Route exact path="/report/html">
          <IFrame />
        </Route>
        <Route exact path="/estimation">
          <Estimation />
        </Route>
        <Route exact path="/migration">
          <Migration />
        </Route>
        <Route exact path="/search-nuget">
          <SearchNuGet />
        </Route>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
