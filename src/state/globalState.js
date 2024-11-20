// GlobalState.js
import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

const State = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  return (
    <Context.Provider value={{ authorized, setAuthorized }}>
      {children}
    </Context.Provider>
  );
};

const useGlobalState = () => useContext(Context);
export {State, useGlobalState};