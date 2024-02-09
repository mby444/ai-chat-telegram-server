import AWS from "aws-sdk";
import { BotResponseError } from "../tool/error.js";
import "../config/dotenv.js";

const s3 = new AWS.S3();
const bucket = process.env.AWS_BUCKET;

export const uploadFileToS3 = async (fileBuffer, fileFullPath) => {
  try {
    const params = {
      Bucket: bucket,
      Key: fileFullPath,
      Body: fileBuffer,
    };
    await s3.putObject(params).promise();
  } catch (err) {
    console.log("uploadFile", err);
  }
};
