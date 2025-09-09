import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
