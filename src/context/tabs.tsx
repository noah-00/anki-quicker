import React, { ReactNode, useContext, useState } from "react";

import { PageType } from "@/types";
import { PAGE_TYPE_ADD } from "@/utils/Const";

interface TabsProviderProps {
  children: ReactNode;
}

interface TabsContextType {
  activePage: PageType;
  handleSetActivePage: (currentPagePath: PageType) => void;
}

const TabsContext = React.createContext<TabsContextType>({
  activePage: PAGE_TYPE_ADD,
  handleSetActivePage: () => {}
});

export const useTabs = () => {
  return useContext(TabsContext);
};

export const TabsProvider = ({ children }: TabsProviderProps) => {
  const [activePage, setActivePage] = useState<PageType>(PAGE_TYPE_ADD); // activePageの初期値に型を指定

  const handleSetActivePage = async (currentPagePath: PageType) => {
    setActivePage(currentPagePath);
  };

  const value = {
    activePage,
    handleSetActivePage
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
