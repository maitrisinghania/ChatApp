import { useContext } from "react";


import { Dialog, Box, styled } from "@mui/material";


import { AccountContext } from "../../context/AccountProvider";

//components
import Menu from './menu/Menu';
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";


const Component = styled(Box)`
    display: flex;
    overflow-x: auto;
    @media (max-width: 600px) {
        flex-direction: row;  // Stack the components vertically on smaller screens
    }
`;

const LeftComponent = styled(Box)`
    min-width: 450px;
    flex-shrink: 0;
    
    @media (max-width: 600px) {
        min-width: 300px;
    }
`;

const RightComponent = styled(Box)`
    width: 75%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.14);
    flex-shrink: 0;

    @media (max-width: 600px) {
        width: 100%;  // Take full width on small screens
        border-left: none;  // Remove border for a cleaner look on small screens
    }
`

const dialogStyle = {
    height: '95%',
    width: '100%',
    margin: '20px',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    overflow: 'hidden'
};

const ChatDialog = () => {

    const { person } = useContext(AccountContext);




    return (
        <Dialog open={true}
            PaperProps={{ sx: dialogStyle }}
            hideBackdrop={true}
            maxWidth={'md'}
        >
            <Component>

                <LeftComponent>
                    <Menu />
                </LeftComponent>


                <RightComponent>
                    {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
                </RightComponent>
            </Component>


        </Dialog>

    )
}

export default ChatDialog;