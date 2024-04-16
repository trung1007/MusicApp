import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default AuthContext

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider
          value={{
            user,
          }}>
          {children}
        </AuthContext.Provider>
      );
}
