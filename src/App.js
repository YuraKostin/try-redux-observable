import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

// import { fetchUser } from './store/modules/users';
import { fetchUser } from './store/modules/users';

const selectUsers = (state) => Object.values(state.usersByUsername.users);

const User = ({ id, username }) => (
  <p>
    User: {username} ({id})
  </p>
);

const isEven = (value) => value % 2 === 0;

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [userCount, setUserCount] = useState(1);
  const handleClick = () => {
    dispatch(fetchUser(userCount, { isEven: isEven(userCount), userCount }));
    setUserCount(userCount + 1);
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Load user</button>

      {users.map(User)}
    </div>
  );
};

export default App;
