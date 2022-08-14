import React, { useState, useCallback, useLayoutEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import emojiUtils from "emoji-utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessage, sendMessage } from "../../../socket/socketConnection";

import Message from "./ChatMessage";

export default function Chat() {
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const { messages } = room;

  useLayoutEffect(() => {
    fetchMessage(room.roomId);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    sendMessage(newMessages[0].text, room.roomId); 
    GiftedChat.append(messages, newMessages);
  }, []);


  function mapUser(user) {
    console.log(user);
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
      inverted={false}
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={mapUser(user)}
      renderMessage={renderMessage}
    />
  );
}
