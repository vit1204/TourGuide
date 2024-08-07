import { useState } from "react";
import {createContext,useContext} from "react"


const GlobalContext = createContext();
export const useGlobalContext =  () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [user,setUser ] = useState(null)
    const [place, setPlace] = useState('')
    const [date,setDate] = useState(new Date())
    const [languages,setLanguages] = useState('')
    const [gender,setGender] = useState('')
    const [hobbies, setHobbies] = useState('')
    const [hometown,setHometown] = useState('')


    return(
        <GlobalContext.Provider
      value={{
        user,
        setUser,
       place,
       setPlace,
       date,
       setDate,
       gender,
       setGender,
    languages,
    setLanguages,
    hobbies, setHobbies,
    hometown,setHometown

      }}
    >
      {children}
    </GlobalContext.Provider>
    )
}

export default GlobalProvider;