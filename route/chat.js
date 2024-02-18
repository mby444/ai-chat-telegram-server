import { Router } from "express";
import {
  generateFromFreeText,
  generateFromHelp,
  deleteFromHistory,
  generateFromPhoto,
} from "../bot/generator.js";
import {
  getSuccessHttpResponseObj,
  getFailHttpResponseObj,
} from "../tool/response-text.js";
import { saveUserHistory } from "../database/tool/users.js";

export const route = Router();

route.post("/", async (req, res) => {
  const { chatId, text } = req.body;
  console.log("/", chatId);
  try {
    const responseText = await generateFromFreeText(chatId, text);
    const responseObj = getSuccessHttpResponseObj(responseText);
    res.json(responseObj);
  } catch (err) {
    console.log("/", err);
    const errorObj = getFailHttpResponseObj(err);
    res.json(errorObj);
  }
});

route.post("/photo", async (req, res) => {
  const { chatId, username, text, file } = req.body;
  console.log("/photo", chatId);
  try {
    const responseText = await generateFromPhoto(chatId, username, text, file);
    const responseObj = getSuccessHttpResponseObj(responseText);
    res.json(responseObj);
  } catch (err) {
    console.log("/photo", err);
    const errorObj = getFailHttpResponseObj(err);
    res.json(errorObj);
  }
});

route.post("/help", async (req, res) => {
  const errorMessage = "[Gagal menampilkan daftar command]";
  try {
    const responseText = await generateFromHelp();
    const responseObj = getSuccessHttpResponseObj(responseText);
    res.json(responseObj);
  } catch (err) {
    console.log("/help", err);
    const errorObj = getFailHttpResponseObj(err, errorMessage);
    res.json(errorObj);
  }
});

route.post("/random", async (req, res) => {
  const { chatId } = req.body;
  const text = "Jelaskan tentang topik apapun secara random";
  console.log("/random", chatId);
  const errorMessage = "[Gagal menampilkan topik random]";
  try {
    const responseText = await generateFromFreeText(chatId, text);
    const responseObj = getSuccessHttpResponseObj(responseText);
    res.json(responseObj);
  } catch (err) {
    console.log("/random", err);
    const errorObj = getFailHttpResponseObj(err, errorMessage);
    res.json(errorObj);
  }
});

route.post("/history", async (req, res) => {
  const { chatId, botData, userData, text } = req.body;
  console.log("/history", chatId);
  try {
    const responseText = await saveUserHistory(
      botData,
      userData,
      text,
      botData.botText
    );
    const responseObj = getSuccessHttpResponseObj(responseText);
    res.json(responseObj);
  } catch (err) {
    console.log("/history", err);
    const errorObj = getFailHttpResponseObj(err);
    res.json(errorObj);
  }
});

route.put("/history", async (req, res) => {
  const { chatId, userData } = req.body;
  console.log("/history", chatId);
  const message =
    "[History chat berhasil dibersihkan, silahkan memulai topik baru]";
  const errorMessage = "[History gagal dibersihkan]";
  try {
    const deletedMessageIds = await deleteFromHistory(chatId, userData);
    const responseObj = getSuccessHttpResponseObj(message, message, {
      deletedMessageIds,
    });
    res.json(responseObj);
  } catch (err) {
    console.log("/history", err);
    const errorObj = getFailHttpResponseObj(err, errorMessage);
    res.json(errorObj);
  }
});
