export class BotResponseError extends Error {
  static getMessage(err, options = {}) {
    const defaultMessage = options?.defaultMessage || "Error";
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
