import { createContext } from "react";


type contextType = {
    // isCodeOpen:boolean,
}

type providerType = {
    children:React.ReactNode
    value:contextType
}

const codeContext = createContext<contextType | null>(null)

export const CodeContextProvider = ({children,value}:providerType)=>{
   return <codeContext.Provider value={value}> {children} </codeContext.Provider>
}