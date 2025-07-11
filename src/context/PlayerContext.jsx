import { createContext, useRef } from "react";
export const PlayerContext = createContext();

const PlayerContext = createContext();

const PlayerContextProvider = (props) => {


   const audioRef = useRef();

    const contextValue = {

    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}