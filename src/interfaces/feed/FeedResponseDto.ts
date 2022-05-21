import mongoose from "mongoose";

export interface FeedResponseDto {
    _id: mongoose.Schema.Types.ObjectId;
    image: String;
    content: String;
    userName: string;
    userProfileImage: string;
}