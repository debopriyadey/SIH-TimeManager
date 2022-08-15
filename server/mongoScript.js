import Message from "./models/message";

const deleteMessages = async () => {
  await Message.deleteMany({});
};

deleteMessages();
