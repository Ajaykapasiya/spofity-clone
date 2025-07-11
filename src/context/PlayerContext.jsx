import { createContext } from "react";
export const PlayerContext = createContext();

const PlayerContext = createContext();

const PlayerContextProvider = () => {

    const contextValue = {

    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}