import path from "path";
import "../config/dotenv.js";
import { generate, checkMimeType, getChatHistory } from "../api/gemini.js";
import { botCommandList } from "../constant/index.js";
import { BotResponseError } from "../tool/error.js";
import {
  fileToGenerativePart,
  savePhoto,
  getPhotoCaption,
} from "../api/telegram.js";
import { saveUserHistory } from "../database/tool/users.js";
import { moveHistory } from "../database/tool/cleared-histories.js";
import User from "../database/model/Users.js";
import ClearedHistory from "../database/model/ClearedHistories.js";

export const generateFromFreeText = async (chatId, userData, text) => {
  const oldUser = await User.findOne({ chatId }, { _id: 0 });
  const oldHistory = getChatHistory(oldUser?.history);
  const response = await generate(text, null, oldHistory);
  await saveUserHistory(userData, text, response, oldUser);
  return response;
};

export const generateFromPhoto = async (chatId, userData, text, file) => {
  const fileId = file.file_id;
  const fileUId = file.file_unique_id;
  const caption = getPhotoCaption(text);
  const oldUser = await User.findOne({ chatId }, { _id: 0 });
  const oldHistory = getChatHistory(oldUser?.history);
  const photo = await fileToGenerativePart(fileId);
  checkMimeType(photo.inlineData.data);
  const photoStoragePath = path.join(process.cwd(), "upload/photo");
  await savePhoto(userData.username, fileId, fileUId, photoStoragePath);
  const response = await generate(caption, [photo], oldHistory);
  await saveUserHistory(userData, caption, response, oldUser);
  return response;
};

export const generateFromHelp = async () => {
  return botCommandList;
};

export const deleteFromHistory = async (chatId, userData) => {
  const oldUser = await User.findOne({ chatId }, { _id: 0 });
  const oldHistory = oldUser?.history;
  const oldClearedHistory = await ClearedHistory.findOne({ chatId });
  await moveHistory(userData, oldHistory, oldClearedHistory);
  return "[History chat berhasil dibersihkan, silahkan memulai topik baru]";
};
