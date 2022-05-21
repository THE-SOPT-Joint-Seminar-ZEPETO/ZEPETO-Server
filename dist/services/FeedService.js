"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const s3Config_1 = __importDefault(require("../config/s3Config"));
const Feed_1 = __importDefault(require("../models/Feed"));
const fs_1 = __importDefault(require("fs"));
const Feed_2 = __importDefault(require("../models/Feed"));
const uploadFileToS3 = (fileData, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileContent = fs_1.default.readFileSync(fileData.path);
        const params = {
            Bucket: config_1.default.bucketName,
            Key: fileData.originalname,
            Body: fileContent,
        };
        const result = yield s3Config_1.default.upload(params).promise();
        const file = new Feed_1.default({
            link: result.Location,
            content: content,
            fileName: fileData.originalname,
        });
        yield file.save();
        const data = {
            _id: file._id,
            content: content,
            link: result.Location,
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const uploadFeed = (fileData, feedCreateDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileContent = fs_1.default.readFileSync(fileData.path);
        const params = {
            Bucket: config_1.default.bucketName,
            Key: fileData.originalname,
            Body: fileContent,
        };
        const result = yield s3Config_1.default.upload(params).promise();
        const feed = new Feed_2.default({
            content: feedCreateDto.content,
            link: result.Location,
            fileName: feedCreateDto.fileName
        });
        yield feed.save();
        const data = {
            _id: feed._id,
            image: result.Location,
            content: feedCreateDto.content,
            userName: "zepeto",
            userProfileImage: "https://thesopt.s3.ap-northeast-2.amazonaws.com/sample-profile-picture.png"
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getFeedByRandom = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedList = yield Feed_2.default.find();
        if (!feedList) {
            return null;
        }
        const index = Math.floor(Math.random() * (feedList.length));
        const data = {
            _id: feedList[index].id,
            image: feedList[index].link,
            content: feedList[index].content,
            userName: "zepeto",
            userProfileImage: "https://thesopt.s3.ap-northeast-2.amazonaws.com/sample-profile-picture.png"
        };
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    uploadFileToS3,
    uploadFeed,
    getFeedByRandom,
};
//# sourceMappingURL=FeedService.js.map