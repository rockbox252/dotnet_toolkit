import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'fontsource-roboto';

import reducer from './reducers';
import App from './components/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3a9ce8',
      main: '#0984e3',
      dark: '#0876cc',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ef706e',
      main: '#eb4d4b',
      dark: '#d34543',
      contrastText: '#fff',
    },
  },
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root')
);
