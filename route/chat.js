import { Router } from "express";
import {
  generateFromFreeText,
  generateFromHelp,
  deleteFromHistory,
} from "../bot/generator.js";
import {
  getSuccessHttpResponseObj,
  getFailHttpResponseObj,
} from "../tool/response-text.js";

export const route = Router();

route.post("/", async (req, res) => {
  const { chatId, userData, text } = req.body;
  console.log("/", chatId);
  try {
    const responseText = await generateFromFreeText(chatId, userData, text);
    const responseObj = getSuccessHttpResponseObj(responseText);
    res.json(responseObj);
  } catch (err) {
    console.log("/", err);
    const errorObj = getFailHttpResponseObj(err);
    res.json(errorObj);
  }
});

route.post("/help", async (req, res) => {
  const { chatId } = req.body;
  console.log("/help", chatId);
  const errorMessage = "[Gagal menampilkan daftar command]";
  try {
    const responseText = await generateFromHelp(chatId);
    const responseObj = getSuccessHttpResponseObj(responseText);
    res.json(responseObj);
  } catch (err) {
    console.log("/help", err);
    const errorObj = getFailHttpResponseObj(err, errorMessage);
    res.json(errorObj);
  }
});

route.post("/random", async (req, res) => {
  const { chatId, userData } = req.body;
  const text = "Jelaskan tentang topik apapun secara random";
  console.log("/random", chatId);
  const errorMessage = "[Gagal menampilkan topik random]";
  try {
    const responseText = await generateFromFreeText(chatId, userData, text);
    const responseObj = getSuccessHttpResponseObj(responseText);
    res.json(responseObj);
  } catch (err) {
    console.log("/random", err);
    const errorObj = getFailHttpResponseObj(err, errorMessage);
    res.json(errorObj);
  }
});

route.put("/history", async (req, res) => {
  const { chatId, userData } = req.body;
  const message =
    "[History chat berhasil dibersihkan, silahkan memulai topik baru]";
  const errorMessage = "[History gagal dibersihkan]";
  try {
    await deleteFromHistory(chatId, userData);
    const responseObj = getSuccessHttpResponseObj("", message);
    res.json(responseObj);
  } catch (err) {
    const errorObj = getFailHttpResponseObj(err, errorMessage);
    res.json(errorObj);
  }
});