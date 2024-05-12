import React, { createContext, useContext, useState } from "react";

const SongContext =createContext()

export default SongContext

export const useSongContext = () => useContext(SongContext)

export const SongProvider = ({ children }) =>{
    const [song, setSong] = useState({
    })
    const [select, setSelect] = useState(true)
    // console.log(select)
    return (
        <SongContext.Provider
          value={{
            song,
            select
          }}>
          {children}
        </SongContext.Provider>
      );
}
