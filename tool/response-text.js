import fs from "fs";
import path from "path";
import { BotResponseError } from "./error.js";
import "../config/dotenv.js";

export const getResponseText = (name) => {
  const filePath = path.join(process.cwd(), `text-response/${name}.txt`);
  try {
    return fs.readFileSync(filePath, {
      encoding: "utf-8",
    });
  } catch (err) {
    return `[Telah terjadi kesalahan ketika mengambil daftar command]`;
  }
};

export const getSuccessHttpResponseObj = (
  text,
  message = "",
  otherData = {}
) => {
  return {
    status: "success",
    statusCode: 200,
    message,
    errorMessage: "",
    data: {
      text,
      ...otherData,
    },
  };
};

export const getFailHttpResponseObj = (
  err,
  defaultMessage = null,
  otherData = {}
) => {
  const errorMessage = BotResponseError.getMessage(err, { defaultMessage });
  return {
    status: "fail",
    statusCode: 500,
    message: "",
    errorMessage,
    data: {
      text: "",
      ...otherData,
    },
  };
};
