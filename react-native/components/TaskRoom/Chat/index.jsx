import React, { useState, useCallback, useLayoutEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import emojiUtils from "emoji-utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessage, sendMessage } from "../../../socket/socketConnection";
import { addMessage } from "../../../redux/slice/roomSlice";
import { socket } from "../../../socket/socketConnection";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import Message from "./ChatMessage";

export default function Chat() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (room.roomId) {
      setLoading(true);
      fetchMessage(room.roomId);
    }
    socket.on("messages:all", (data) => {
      const msgs = data.map(mapMessage);
      setMessages(msgs);
      setLoading(false);
    });
  }, [room.roomId, socket]);

  useLayoutEffect(() => {
    socket.on("message:receive", (data) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [data]));
    });
    return () => {
      socket.off("message:receive", (data) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, [data]));
      });
    };
  }, [socket]);

  const onSend = (newMessages = []) => {
    sendMessage(newMessages[0].text, room.roomId);
  };

  function mapUser(user) {
    return {
      _id: user._id,
      name: user.name,
      avatar: `https://i.pravatar.cc/140?u=${user._id}`,
    };
  }

  function mapMessage(message) {
    return {
      _id: message._id,
      text: message.content,
      user: mapUser(message.sender),
      createdAt: new Date(message.createdAt),
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

  if(loading) {
    return <ActivityIndicator style={{ marginTop: 10 }} animating={true} />
  }

  return (
    <GiftedChat
      loadEarlier={true}
      inverted={true}
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={mapUser(user)}
      renderMessage={renderMessage}
      alwaysShowSend={true}
    />
  );
}
