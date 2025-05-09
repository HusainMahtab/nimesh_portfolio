import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: (req, file) => {
    return {
      folder: file.mimetype.includes("pdf") ? "resumes" : "profile_pics",
      allowed_formats: file.mimetype.includes("pdf")
        ? ["pdf"]
        : ["jpeg", "png", "jpg"],
      resource_type: file.mimetype.includes("pdf") ? "raw" : "image",
    };
  },
});
const upload = multer({ storage });

export default upload;
