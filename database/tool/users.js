import User from "../model/Users.js";

const createUserHistory = async (data) => {
  await User.create(data);
};

const updateUserHistory = async (data, oldUser) => {
  const { chatId, history } = data;
  const { history: oldHistory } = oldUser;
  const mergedHistory = [...oldHistory, ...history];
  await User.updateOne(
    { chatId },
    {
      $set: {
        history: mergedHistory,
      },
    }
  );
};

export const saveUserHistory = async (
  { botMessageId, botChatId, botFirstName, botUsername, botIsBot, botDate },
  {
    messageId,
    id: chatId,
    first_name: firstName,
    last_name: lastName,
    username,
    type,
    is_bot: isBot,
    language_code: languageCode,
    date,
  },
  prompt,
  response,
  oldUser
) => {
  console.log("saveUserHistory()", prompt);
  const newHistory = [
    {
      role: "user",
      parts: prompt,
      messageId,
      date,
    },
    {
      role: "model",
      parts: response,
      messageId: botMessageId,
      date: botDate,
    },
  ];
  const data = {
    chatId,
    firstName,
    lastName,
    username,
    type,
    isBot,
    languageCode,
    botChatId,
    botFirstName,
    botUsername,
    botIsBot,
    history: newHistory,
  };
  oldUser
    ? await updateUserHistory(data, oldUser)
    : await createUserHistory(data);
};
