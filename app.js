import express from "express";
const app = express();
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
import videoUpload from "./upload.js";
import { postVideo, videoList,getVideo, stream } from "./controler/postVideo.js";
import db_conn from "./db_conn/db_conn.js";
db_conn();
import got from "got";

import fs, { createWriteStream } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/videoList", videoList);

app.post("/", videoUpload.single("video"), postVideo);

app.get("/stream/:id", getVideo);

app.get("/streams/:id", stream);

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
