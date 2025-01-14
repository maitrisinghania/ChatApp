import { useEffect, useState, useContext, useCallback } from "react";
import { Box, styled, Divider } from '@mui/material';
import { getUsers } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";

//Components
import Conversation from "./Conversation";

const Component = styled(Box)`
    height: 81vh;
    overflow: overlay;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background: #e9edef;
    opacity: 0.6;
`;

const Conversations = ({ text }) => {
    const [users, setUsers] = useState([]);

    const { account, socket, setActiveUsers, newMessageFlag } = useContext(AccountContext);

    const fetchData = useCallback(async () => {
        let response = await getUsers();
        const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
        setUsers(filteredData);
    }, [text]);

    useEffect(() => {
        fetchData();
    }, [text, newMessageFlag, fetchData, setActiveUsers, account]);


    useEffect(() => {
        socket.current.emit('addUsers', account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
            console.log("Data received from users:", users);
        });

        // Listen for the newConversation event
        socket.current.on("newConversation", () => {
            fetchData();  // Re-fetch the users list when a new conversation is created
        });
        
    },[account, setActiveUsers, socket, newMessageFlag, fetchData]);

    


    return (
        <Component>
            {
                users.map(user => (
                    user.sub !== account.sub &&
                    <>
                    <Conversation user={user} socket={socket}/>
                    <StyledDivider/>
                    </>
                ))
            }
        </Component>
    )
}

export default Conversations;