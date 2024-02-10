import { S3 } from "@aws-sdk/client-s3";
import "../config/dotenv.js";

const s3 = new S3();
const bucket = process.env.AWS_BUCKET;

export const uploadFileToS3 = async (fileBuffer, fileFullPath) => {
  try {
    const params = {
      Bucket: bucket,
      Key: fileFullPath,
      Body: fileBuffer,
    };
    const result = await s3.putObject(params);
    console.log("uploadFileToS3", result);
  } catch (err) {
    console.log("uploadFileToS3", err);
  }
};
