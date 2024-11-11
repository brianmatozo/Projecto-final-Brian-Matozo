import { Request } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage: StorageEngine = multer.diskStorage({
    destination: function (_req: Request, _file: Express.Multer.File, cb: Function) {
        cb(null, path.join(__dirname, "../public/img"));
    },
    filename: function (_req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Multer uploader instance
const uploader = multer({ storage });

export default uploader;
