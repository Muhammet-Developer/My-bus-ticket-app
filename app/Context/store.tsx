'Use client';

import { IUserRegisterType } from '@/types/Type';
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface ContextProps {
  saveUserData: IUserRegisterType;
  userData: IUserRegisterType[];
  setUserData: Dispatch<SetStateAction<IUserRegisterType[]>>;
  setSaveUserData: Dispatch<SetStateAction<IUserRegisterType>>;
}

//2
const loginUser = localStorage.getItem('user');
const loginUserData = loginUser ? JSON.parse(loginUser) : null;
const GlobalContext = createContext<ContextProps>({
  saveUserData: {} as IUserRegisterType,
  userData: [],
  setUserData: (): IUserRegisterType[] => [],
  setSaveUserData: (): void => {},
});

//3
export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<[] | IUserRegisterType[]>([]);
  const [saveUserData, setSaveUserData] =
    useState<IUserRegisterType>(loginUserData);
  return (
    <GlobalContext.Provider
      value={{
        saveUserData,
        setSaveUserData,
        userData,
        setUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

//4

export const useGlobalContext = () => useContext(GlobalContext);
