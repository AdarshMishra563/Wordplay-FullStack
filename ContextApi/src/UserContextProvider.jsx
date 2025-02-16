import React, { useState } from "react";
import UserContext from "./UserContext";
const UserContextProviderl =({children})=>{
    const [user,setuser]=React.useState(8)
    return (
        <UserContext.Provider value={{user,setuser}}>
       children {children}

        </UserContext.Provider>
    )

}
export default UserContextProvider