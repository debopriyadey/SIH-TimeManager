import React, { useState, useCallback, useLayoutEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import emojiUtils from "emoji-utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessage, sendMessage } from "../../../socket/socketConnection";

import Message from "./ChatMessage";

export default function Chat() {
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const messages = [];

  room.messages.forEach((msg) => {
    messages.push(mapMessage(msg));
  });

  console.log(user);

  useLayoutEffect(() => {
    console.log("hi");
    fetchMessage(room.roomId);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    GiftedChat.append(messages, newMessages);
    console.log(newMessages[0]);
    sendMessage(newMessages[0].text, room.roomId);
  }, []);

  function mapMessage(message) {
    return {
      _id: message._id,
      text: message.content,
      createdAt: new Date(message.createdAt),
      user: mapUser(message.sender),
    };
  }

  function mapUser(user) {
    return {
      _id: user._id,
      name: user.name,
      avatar: `https://i.pravatar.cc/140?u=${user._id}`,
    };
  }

  const renderMessage = (props) => {
    const {
      currentMessage: { text: currText },
    } = props;

    let messageTextStyle;

    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        lineHeight: 34,
      };
    }

    return <Message {...props} />;
  };

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={mapUser(user)}
      renderMessage={renderMessage}
    />
  );
}
