import express, { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import FeedService from "../services/FeedService";
import { validationResult } from "express-validator";
import { FeedCreateDto } from "../interfaces/feed/FeedCreateDto";

const uploadFileToS3 = async (req: Request, res: Response) => {
  if (!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

  const fileData: Express.Multer.File = req.file;

  try {
    const data = await FeedService.uploadFileToS3(fileData);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route POST /feed
 * @desc Upload Feed
 */
const uploadFeed = async (req: Request, res: Response) => {
  if (!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

  const feedImage : Express.Multer.File = req.file; // 이미지 파일
  const feedCreateDto: FeedCreateDto = req.body; // 피드 내용

  try {
    const data = await FeedService.uploadFeed(feedImage, feedCreateDto);

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FEED_SUCCESS, data));

  } catch (error) {
    console.log(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
}

export default {
  uploadFileToS3,
  uploadFeed
};
