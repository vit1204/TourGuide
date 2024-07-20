import { useState } from "react";
import {createContext,useContext} from "react"


const GlobalContext = createContext();
export const useGlobalContext =  () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [user,setUser ] = useState(null)
    const [place, setPlace] = useState('')
    const [date,setDate] = useState(new Date())


    return(
        <GlobalContext.Provider
      value={{
        user,
        setUser,
       place,
       setPlace,
       date,
       setDate
      }}
    >
      {children}
    </GlobalContext.Provider>
    )
}

export default GlobalProvider;