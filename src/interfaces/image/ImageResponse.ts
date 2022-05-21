import { IImage } from "./Image";

export interface ImageResponse {
  title: string;
  description: string;
  profileImage: string;
  images: [IImage];
}
