import { useState, useRef, useEffect } from "react";
import { createContext } from "react";

import { io } from 'socket.io-client';

export const AccountContext = createContext(null);


const AccountProvider = ({ children }) => {

    const [account, setAccount] = useState();
    const [person, setPerson] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);

    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:9000');
        
    },[]);

    useEffect(() => {
        socket.current.on('getUsers', (users) => {
            setActiveUsers(users);
        });
    }, []);


    return (
        <AccountContext.Provider value={{
            account,
            setAccount,
            person,
            setPerson,
            socket,
            activeUsers,
            setActiveUsers,
            newMessageFlag,
            setNewMessageFlag
        }}>
            {children}

        </AccountContext.Provider>
        
    )
}

export default AccountProvider;
