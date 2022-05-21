import mongoose from "mongoose";
import { ImageResponse } from "../interfaces/image/ImageResponse";
import { Image } from "../interfaces/image/Image";

const ImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    profileImage: {
      type: String,
      required: true,
    },
    images: {
      type: [Image],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ImageResponse & mongoose.Document>("Image", ImageSchema);
