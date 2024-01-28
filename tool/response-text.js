import fs from "fs";
import { BotResponseError } from "./error.js";

export const getResponseText = (name) => {
  try {
    return fs.readFileSync(`./text-response/${name}.txt`, {
      encoding: "utf-8",
    });
  } catch (err) {
    return "[Gagal menampilkan respons teks]";
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
