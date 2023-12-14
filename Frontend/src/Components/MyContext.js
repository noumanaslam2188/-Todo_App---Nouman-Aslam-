import React, {createContext,useContext, useState } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);

  return (
    <ModeContext.Provider value={{ todo, setTodo: setTodo }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useContextMode = () => {
  const { todo, setTodo } = useContext(ModeContext);
  return { todo, setTodo };
};
