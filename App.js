import React from 'react';
import store from './src/redux_store/store';
import { Provider } from 'react-redux';
import { Router } from './src/Routes/Router';
// import LocationChecker from './LocationChecker';

const App = () => {
  return (
    <Provider store={store}>
      {/* <LocationChecker/> */}
      <Router/>
    </Provider>
  );
};

export default App;