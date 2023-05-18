import { createContext } from "react";

export const State = createContext()
export const host = 'https://api.neevoo.uz/v1'

export const StatePriveder = ({ children }) => {

    const data = {}

    return <State.Provider value={data}>{ children }</State.Provider>
}