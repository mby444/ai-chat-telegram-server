import { S3 } from "@aws-sdk/client-s3";
import { BotResponseError } from "../tool/error.js";
import "../config/dotenv.js";

const s3 = new S3();
const bucket = process.env.AWS_BUCKET;

export const getFilesFromS3 = async () => {
  try {
    const params = {
      Bucket: bucket,
    };
    const data = await s3.listObjects(params);
    const contents = data.Contents;
    return contents;
  } catch (err) {
    const message = "[Telah terjadi kesalahan mengambil list file]";
    console.log("getFilesFromS3", err);
    throw new BotResponseError(message);
  }
};

export const getFileFromS3 = async (key) => {
  try {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const file = await s3.getObject(params);
    return file;
  } catch (err) {
    console.log(err);
  }
};

export const getBufferFromS3 = async (key) => {
  const obj = await getFileFromS3(key);
  const buffer = obj.Body;
  return buffer;
};

export const uploadFileToS3 = async (fileBuffer, fileFullPath) => {
  try {
    const params = {
      Bucket: bucket,
      Key: fileFullPath,
      Body: fileBuffer,
    };
    await s3.putObject(params);
  } catch (err) {
    const message = "[Telah terjadi kesalahan ketika menyimpan file]";
    console.log("uploadFileToS3", err);
    throw new BotResponseError(message);
  }
};
