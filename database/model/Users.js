import { model, Schema } from "mongoose";

const userSchema = new Schema({
  chatId: Number,
  firstName: String,
  lastName: String,
  username: String,
  type: String,
  isBot: Boolean,
  languageCode: String,
  botChatId: Number,
  botFirstName: String,
  botUsername: String,
  botIsBot: Boolean,
  history: [
    {
      role: String,
      parts: String,
      messageId: Number,
      date: Number,
    },
  ],
});

export default model("users", userSchema);
