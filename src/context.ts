import React, { createContext, useContext } from "react";

// 定义全局上下文的类型
interface GlobalContextType {
  audioUrl: string;
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  transAudioUrl: string;
  setTransAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  transText: string;
  setTransText: React.Dispatch<React.SetStateAction<string>>;
}

// 创建上下文，使用定义的类型，并提供一个初始值
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 自定义 hook 来使用全局上下文
export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
}

export { GlobalContext };