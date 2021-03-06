import config from "../config";
import storage from "../config/s3Config";
import File from "../models/Feed";
import fs from "fs";
import { FileResponseDto } from "../interfaces/file/FileResponseDto";
import { FeedCreateDto } from "../interfaces/feed/FeedCreateDto";
import Feed from "../models/Feed";
import { FeedResponseDto } from "../interfaces/feed/FeedResponseDto";

const uploadFileToS3 = async (fileData: Express.Multer.File, content: string): Promise<FileResponseDto> => {
  try {
    const fileContent: Buffer = fs.readFileSync(fileData.path);

    const params: {
      Bucket: string;
      Key: string;
      Body: Buffer;
    } = {
      Bucket: config.bucketName,
      Key: fileData.originalname,
      Body: fileContent,
    };

    const result = await storage.upload(params).promise();

    const file = new File({
      link: result.Location,
      content: content,
      fileName: fileData.originalname,
    });

    await file.save();

    const data = {
      _id: file._id,
      content: content,
      link: result.Location,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const uploadFeed = async (fileData: Express.Multer.File, feedCreateDto: FeedCreateDto): Promise<FeedResponseDto> => {
  try {
    const fileContent: Buffer = fs.readFileSync(fileData.path);

    const params: {
      Bucket: string;
      Key: string;
      Body: Buffer;
    } = {
      Bucket: config.bucketName,
      Key: fileData.originalname,
      Body: fileContent,
    };

    const result = await storage.upload(params).promise();

    const feed = new Feed({
      content: feedCreateDto.content,
      link: result.Location,
      fileName: feedCreateDto.fileName
    });

    await feed.save();

    const data = {
      _id: feed._id,
      image: result.Location,
      content: feedCreateDto.content,
      userName: "zepeto",
      userProfileImage: "https://thesopt.s3.ap-northeast-2.amazonaws.com/sample-profile-picture.png"
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getFeedByRandom = async (): Promise<FeedResponseDto | null> => {
  try {
    const feedList = await Feed.find();

    if (!feedList) {
      return null;
    }

    const index = Math.floor(Math.random()*(feedList.length));

    const data = {
      _id: feedList[index].id,
      image: feedList[index].link,
      content: feedList[index].content,
      userName: "zepeto",
      userProfileImage: "https://thesopt.s3.ap-northeast-2.amazonaws.com/sample-profile-picture.png"
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  uploadFileToS3,
  uploadFeed,
  getFeedByRandom,
};
