import express, { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import ImageService from "../services/ImageService";

const getImages = async (req: Request, res: Response) => {
  try {
    const data = await ImageService.getImages();

    res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_IMAGES_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  getImages,
};
