import { useContext, useEffect, useState } from "react";

import { Box, Typography, styled } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { setConversation, getConversation } from "../../../service/api";
import { formatDate } from "../../../utils/common-utils";

const Component = styled(Box)`
    display: flex;
    height: 45px;
    padding: 13px 0;
    cursor: pointer;
`;

const Container = styled(Box)`
    display: flex;
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
    margin-right: 20px
`;

const Text = styled(Typography)`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: "50%",
    padding: '0 14px',
    objectFit: 'cover'
    
});



const Conversation = ({user, socket}) => {

    const { setPerson, account,newMessageFlag, setActiveUsers } = useContext(AccountContext);

    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub});
            setMessage({ text: data?.message, timestamp: data?.updatedAt});

        }
        getConversationDetails();
    }, [newMessageFlag, account.sub, user.sub, setActiveUsers]);

    useEffect(() => {
        socket.current.on("getMessage", (data) => {
            console.log("getmessage data: ", data)
            if (data.senderId === user.sub || data.receiverId === user.sub) {
                setMessage(prevMessage => ({
                    ...prevMessage,
                    text: data.text,
                    timestamp: Date.now()
                }));
            }
        });

        // return () => {
        //     socket.current.off("getMessage"); // Cleanup listener
        // };
    }, [user.sub, socket]);

    

    const getUser = async () => {
        
        await setConversation({senderId: account.sub, receiverId: user.sub}, socket);
        setPerson(user);
    }


    return (
        <Component onClick={() => getUser()}>
            <Box>
                <Image src={user.picture} alt="dp" />
            </Box>
            <Box style={{width: '100%'}}>
                <Container>
                    <Typography>{user.name}</Typography>
                    {
                        message?.text && 
                        <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
                    }
                </Container>
                <Box>
                    <Text>{message?.text?.includes('localhost') ? 'media': message.text}</Text>
                </Box>

            </Box>
        </Component>
    )
}

export default Conversation;