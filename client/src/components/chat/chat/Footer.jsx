import { useState, useEffect } from "react";

import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile } from "@mui/icons-material";

import { uploadFile } from "../../../service/api";

import EmojiPicker from 'emoji-picker-react';

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 15px;
    & > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    background-color: #ffffff;
    border-radius: 18px;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    height: 20px;
    padding-left: 25px;
    font-size: 14px;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg);
`;

const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);


    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name",file.name);
                data.append("file", file);
                console.log("data onchange: ", data);
                let response = await uploadFile(data);
                console.log("data from footer: ", response.data);
                setImage(response.data);
            }
        }
        getImage();
    },[file,setImage])

    const onFileChange = (e) => {
        setValue(e.target.files[0].name);
        setFile(e.target.files[0]);
        
    }; 

    const addEmoji = (emojiObject) => {
        const emoji = emojiObject.emoji; // Use `emoji` property to get the emoji
        setValue(prevValue => prevValue + emoji); // Append the emoji to the input field value
    };


       
    

    return (
        <Container>
            <div style={{ position: "relative" }}>
                <EmojiEmotionsOutlined onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                {showEmojiPicker && (
                    <div style={{ position: "absolute", bottom: "60px", zIndex: 10 }}>
                        <EmojiPicker onEmojiClick={addEmoji} />
                    </div>
                )}
            </div>
            <label htmlFor="fileInput">
                <ClipIcon />
            </label>
            <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => onFileChange(e)}
            />
            <Search>
                <InputField
                placeholder="Type a message"
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={(e) => sendText(e)}
                value={value}
                />
            </Search>
            {/* <Mic/> */}
        </Container>
    )
}

export default Footer;