import { Box, styled } from "@mui/material";
import { useContext, useState } from "react";
import { Chat as MessageIcon} from "@mui/icons-material";

//components
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";

import { AccountContext } from "../../../context/AccountProvider";

import { emptyProfilePicture } from "../../../constants/data";

const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    padding: 8px 16px;
    display: flex;
    align-items: center;
`;

const Wrapper = styled(Box)`
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };

    & :first-child {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;

const Image = styled('img')({
    height: 40,
    width: 40,
    borderRadius: '50%'

})


const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { account } = useContext(AccountContext);
    console.log("account picture data: ", account.picture);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    const handleImageError = (event) => {
        event.target.src = emptyProfilePicture; 
    };

    return (
        <>
            <Component>
                <Image src = {account.picture || emptyProfilePicture} alt = "dp" onClick={() => toggleDrawer()} onError={handleImageError}/>
                <Wrapper>
                    <MessageIcon/>
                    <HeaderMenu setOpenDrawer={setOpenDrawer}/>
                </Wrapper>
                
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
        </>
    )
}

export default Header;