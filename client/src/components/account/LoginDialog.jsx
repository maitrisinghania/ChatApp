import { useContext } from "react";

import { Dialog, Typography, List, ListItem, Box, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


const dialogStyle = {
    marginTop: '12%',
    height: '95%',
    width: '60%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    overflow: 'hidden'
}

const Component = styled(Box)`
    display: flex;
`;

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`;

const Title = styled(Typography)`
    font-size: 26px;
    margin-bottom: 25px;
    color: #525252;
    font-weight: 300;
`;

const StyledList = styled(List)`
    & > li {
        padding: 0;
        margin-top: 15px;
        font-size: 18px;
        line-height:28px;
        color: #4a4a4a
    }
`;

const QRCode = styled('img')({
    margin: '50px 0 0 50px',
    height: 264,
    width: 264
});


const LoginDialog = () => {

    const { setAccount } = useContext(AccountContext);

    const onLoginSuccess = (res) => {
        const decoded = jwtDecode(res.credential);
        setAccount(decoded);

    }

    const onLoginError = (res) => {
        console.log('Login Error:', res);

    }


    return (
        <Dialog open = {true}
        PaperProps = {{sx: dialogStyle}}
        hideBackdrop = {true}
        >
            <Component>
                <Container>
                    <Title>To use WhatsApp on your computer:</Title>
                    <StyledList>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                    </StyledList>
                </Container>
                <Box style = {{position:'relative'}}>
                    <QRCode src={qrCodeImage} alt = "QR code" />
                    <Box style={{position:'absolute', top: '50%', transform: 'translateX(25%) translateY(-25%)'}}>
                        <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError = {onLoginError}
                        />
                    </Box>
                </Box>
            </Component>

        </Dialog>
    )
}

export default LoginDialog;