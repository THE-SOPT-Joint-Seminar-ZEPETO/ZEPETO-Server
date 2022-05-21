import { Image } from "./Image";

export interface ImageResponse {
  title: string;
  description: string;
  profileImage: string;
  images: [Image];
}
