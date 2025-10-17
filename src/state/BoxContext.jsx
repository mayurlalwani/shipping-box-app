import React, { createContext, useReducer, useEffect } from "react";

const BoxContext = createContext();

const initialState = JSON.parse(localStorage.getItem("boxes")) || [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_BOX":
      const updated = [...state, action.payload];
      localStorage.setItem("boxes", JSON.stringify(updated));
      return updated;
    default:
      return state;
  }
}

export const BoxProvider = ({ children }) => {
  const [boxes, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(boxes));
  }, [boxes]);

  return (
    <BoxContext.Provider value={{ boxes, dispatch }}>
      {children}
    </BoxContext.Provider>
  );
};

export default BoxContext;
