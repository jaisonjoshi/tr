import { createContext, useState } from 'react';

export const MyContext = createContext({});



export const MycontextProvider = ({ children }) => {
    const [notificationMessage, setNotificationMessage] = useState(null)
  
    return (
      <MyContext.Provider
       value={{
        notificationMessage,setNotificationMessage

       }}
      >
        {children}
      </MyContext.Provider>
    );
  };