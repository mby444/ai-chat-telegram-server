import fs from "fs";
import { BotResponseError } from "./error.js";
import "../config/dotenv.js";

export const getResponseText = (name) => {
  const [devPath, prodPath] = [
    `./text-response/${name}.txt`,
    `../text-response/${name}.txt`,
  ];
  const filePath = process.env.DEV_MODE ? devPath : prodPath;
  try {
    // List directory
    fs.readdir("../", (err, files) => {
      console.log("Reading directory...");
      files.forEach((file) => {
        console.log(file);
      });
    });
    // return fs.readFileSync(filePath, {
    //   encoding: "utf-8",
    // });
    return "Test";
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
