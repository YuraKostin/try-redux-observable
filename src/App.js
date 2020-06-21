import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import { fetchUser } from './store/modules/users';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(1));
  }, []);

  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
};

export default App;
