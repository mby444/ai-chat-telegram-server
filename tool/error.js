export class BotResponseError extends Error {
  static getMessage(err, options = {}) {
    const defaultMessage =
      options?.defaultMessage ||
      "\\[Telah terjadi kesalahan ketika memproses pesan anda, beberapa kemungkinan penyebabnya yaitu karena topik sensitif, kata-kata tidak pantas, kata-kata ambigu, teks tidak jelas, teks dengan font yang tidak standar, dan pelanggaran atas peraturan kami\\]";
    const errorMessage =
      err instanceof BotResponseError ? err.message : defaultMessage;
    return errorMessage;
  }

  static async sendMessage(bot, chatId, err, options = {}) {
    const errorMessage = BotResponseError.getMessage(err, options);
    await bot.sendMessage(chatId, errorMessage);
  }

  constructor(message = "") {
    super(message);
  }
}
