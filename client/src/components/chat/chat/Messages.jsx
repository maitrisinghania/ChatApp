import { useContext, useState, useEffect, useRef } from "react";

import { Box, styled } from "@mui/material";

import { AccountContext } from '../../../context/AccountProvider';

import { getMessages, newMessage } from '../../../service/api';

//Components
import Footer from "./Footer";
import Message from "./Message";
// import { Socket } from "socket.io-client";


const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px
`;


const Messages = ({ person, conversation }) => {

    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState();
    const [image, setImage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, [socket])

    useEffect(() => {
        const getMessageDetails = async () => {
            if (!conversation?._id) return; // Guard clause
        try {
            let data = await getMessages(conversation._id);
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };
        getMessageDetails();
    }, [person._id, conversation?._id, newMessageFlag])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" });

    }, [messages])

    // Handle incoming message and update conversation
    useEffect(() => {
        if (incomingMessage && conversation?.members?.includes(incomingMessage.senderId)) {
            setMessages((prev) => [...prev, incomingMessage]);

            // Notify other components to update recent messages
            socket.current.emit('updateConversation', {
                senderId: incomingMessage.senderId,
                receiverId: incomingMessage.receiverId,
                text: incomingMessage.text,
            });
        }
    }, [incomingMessage, conversation, socket]);


    const sendText = async (e) => {
        console.log(e);
        const code = e.keyCode || e.which;

        if (code === 13) {
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                }

            } else {
                console.log("Image being sent:", image);
                message = {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image
                }

            }

            socket.current.emit('sendMessage', message);

            await newMessage(message);
            setValue('');
            setFile('');
            setImage('');

            setNewMessageFlag(prev => !prev);
        }

    }

    return (
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => (
                        <Container ref={scrollRef}>
                            <Message message={message} />
                        </Container>
                    ))
                }

            </Component>
            <Footer
                sendText={sendText}
                setValue={setValue}
                value={value}
                file={file}
                setFile={setFile}
                setImage={setImage}
            />

        </Wrapper>
    )
}

export default Messages;