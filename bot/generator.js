import "../config/dotenv.js";
import { generate, checkMimeType, getChatHistory } from "../api/gemini.js";
import { botToken, botCommandList, botChatOpts } from "../constant/index.js";
import {
  fileToGenerativePart,
  savePhoto,
  getPhotoCaption,
  escapeMarkdown,
  fixMarkdownFormat,
} from "../api/telegram.js";
import { BotResponseError } from "../tool/error.js";
import { saveUserHistory } from "../database/tool/users.js";
import { moveHistory } from "../database/tool/cleared-histories.js";
import User from "../database/model/Users.js";
import ClearedHistory from "../database/model/ClearedHistories.js";

export const generateFromFreeText = async (chatId, userData, text) => {
  const oldUser = await User.findOne({ chatId }, { _id: 0 });
  const oldHistory = getChatHistory(oldUser?.history);
  const response = await generate(text, null, oldHistory);
  // const formattedResponse = escapeMarkdown(fixMarkdownFormat(response), [
  //   "*",
  //   "`",
  // ]);
  await saveUserHistory(userData, text, response, oldUser);
  return response;
};

export const generateFromHelp = async (chatId) => {
  // const formattedResponse = escapeMarkdown(fixMarkdownFormat(botCommandList), [
  //   "*",
  //   "`",
  // ]);
  return botCommandList;
};

export const deleteFromHistory = async (chatId, userData) => {
  const oldUser = await User.findOne({ chatId }, { _id: 0 });
  const oldHistory = oldUser?.history;
  const oldClearedHistory = await ClearedHistory.findOne({ chatId });
  await moveHistory(userData, oldHistory, oldClearedHistory);
};
