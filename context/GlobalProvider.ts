// import { User } from '@/types/interface';
// import React, { createContext, useContext, useState, ReactNode } from 'react';


// // Define context type
// interface GlobalContextType {
//   isLogged: boolean;
//   setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   loading: boolean;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

// // Create context
// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// // Create custom hook for using context
// export const useGlobalContext = () => {
//   const context = useContext(GlobalContext);
//   if (!context) {
//     throw new Error('useGlobalContext must be used within a GlobalProvider');
//   }
//   return context;
// };

// // GlobalProvider component
// interface GlobalProviderProps {
//   children: ReactNode;
// }

// export const GlobalProvider = ({ children }: GlobalProviderProps) => {
//   const [isLogged, setIsLogged] = useState<boolean>(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const globalContextValue: GlobalContextType = {
//     isLogged,
//     setIsLogged,
//     user,
//     setUser,
//     loading,
//     setLoading,
//   };

//   return (
//     <GlobalContext.Provider value={globalContextValue}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };
