import video from "ffmpeg/lib/video.js";
import Video from "../model/video.js";
import got from "got";


export const postVideo = async (req, res) => {
  try {
    const videoPath = await req.file.publicUrl;
    console.log(videoPath);
    const videoSave = await Video({ video_Url: videoPath });
    const getVideo = await videoSave.save();
    res.json({ getVideo });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const videoList = async (req, res) => {
  try {
    const vidoe = await Video.find();
    res.render("videoList", { videoLink: vidoe });
  } catch (error) {
    console.log(error);
  }
};

export const getVideo = async (req, res) => {
  try {
    const videoID = req.params.id;
    res.render('videoStream', {videoID: videoID})
  } catch (error) {
    console.log(error)
  }
} 

export const stream = async (req, res) => {
  try {
    const videoID = req.params.id;
    console.log(videoID)
    const findVideo = await Video.findOne({_id: videoID});
    console.log(findVideo);

    const head = {
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    got.stream(findVideo.video_Url).pipe(res);
  } catch (error) {
    console.log(error);
  }
};
