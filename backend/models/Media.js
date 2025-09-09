import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;
