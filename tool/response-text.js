import fs from "fs";
import path from "path";
import { BotResponseError } from "./error.js";
import "../config/dotenv.js";

export const getResponseText = (name) => {
  const filePath = path.join(process.cwd(), `text-response/${name}.txt`);
  console.log(process.cwd());
  try {
    return fs.readFileSync(filePath, {
      encoding: "utf-8",
    });
  } catch (err) {
    console.log("getResponseText", err);
    return `[${err.message}]`;
  }
};

export const getSuccessHttpResponseObj = (text, message = "") => {
  return {
    status: "success",
    statusCode: 200,
    message,
    errorMessage: "",
    data: {
      text,
    },
  };
};
export const getFailHttpResponseObj = (err, defaultMessage = null) => {
  const errorMessage = BotResponseError.getMessage(err, { defaultMessage });
  return {
    status: "fail",
    statusCode: 500,
    message: "",
    errorMessage,
    data: {
      text: "",
    },
  };
};
