import ImageKit from "imagekit";
import { ENV } from "./env.js";

const imagekit = new ImageKit({
  publicKey: ENV.IMAGEKIT_PUBLIC_KEY,
  privateKey: ENV.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: ENV.IMAGEKIT_URL_ENDPOINT, // e.g. https://ik.imagekit.io/yourid
});

export default imagekit;
