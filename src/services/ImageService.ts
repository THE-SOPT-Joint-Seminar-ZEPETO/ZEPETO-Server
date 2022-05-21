import config from "../config";
import storage from "../config/s3Config";
import Image from "../models/Image";
import fs from "fs";
import { FileResponseDto } from "../interfaces/file/FileResponseDto";

const getImages = async () => {
  const images = await Image.find();

  return images;
};

export default {
  getImages,
};
