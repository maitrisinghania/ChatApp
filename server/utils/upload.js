import multer from "multer";
import {GridFsStorage} from 'multer-gridfs-storage';

import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@clone-whatsapp.i6p6v.mongodb.net/?retryWrites=true&w=majority&appName=clone-whatsapp`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match= ["image/png", "image/jpg"];

        if (match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-file-${file.originalname}`;
        }

        return{
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        } 
    }
})

export default multer({ storage });