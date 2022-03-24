import mongoose from "mongoose";

const video_Schema = new mongoose.Schema({
    video_Url:{ type: String, required: true}
});

const Video = mongoose.model('testvideo', video_Schema);

export default Video;