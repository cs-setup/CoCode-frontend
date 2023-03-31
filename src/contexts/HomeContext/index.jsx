import { createContext, useState } from "react";

export const HomeContext = createContext({
  publishItem: {},
  setPublishItem: () => {},
});

export const HomeProvider = ({ children }) => {
  const [publishItem, setPublishItem] = useState({});

  return (
    <HomeContext.Provider value={{ publishItem, setPublishItem }}>
      {children}
    </HomeContext.Provider>
  );
};
