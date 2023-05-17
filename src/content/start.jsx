import { createContext, useState } from "react";

export const State = createContext()


export const StatePriveder = ({ children }) => {

    const data = {}

    return <State.Provider value={data}>{ children }</State.Provider>
}