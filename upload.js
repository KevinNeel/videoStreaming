import multer from "multer";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./keys/firebase.json");
import FirebaseStorage from "multer-firebase-storage";
import dotenv from "dotenv";
dotenv.config();


const videoUpload = multer({
  storage: FirebaseStorage({
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    credentials: {
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
      projectId: serviceAccount.project_id,
    },
    public: true,
    directoryPath: process.env.FIREBASE_VIDEO_PATH,
    hooks: {
      beforeUpload(req, file) {
        file.originalname = new Date().toISOString() + "-" + file.originalname;
      },
    },
  }),
  fileFilter: function (req, file, cb) {
    checkFIleType(file, cb);
  },
  limits: {
    fileSize: 40000000, // 70000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});

function checkFIleType(file, cb) {
  const filetype = /jpeg|jpg|png|gif/;
  const imagetype = filetype.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );

  const mimetype = filetype.test(file.mimetype);

  if (imagetype && mimetype) {
    return cb(null, true);
  } else {
    cb("Enter the image");
  }
}

export default videoUpload;
