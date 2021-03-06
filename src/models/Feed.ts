import mongoose from "mongoose";
import { FileInfo } from "../interfaces/file/FileInfo";

const FileSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<FileInfo & mongoose.Document>("File", FileSchema);
