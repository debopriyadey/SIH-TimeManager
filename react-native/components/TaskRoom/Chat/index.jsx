import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import emojiUtils from 'emoji-utils'

import Message from './ChatMessage'

export default function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    const renderMessage = (props) => {
        const {
            currentMessage: { text: currText },
        } = props;

        let messageTextStyle;

        if (currText && emojiUtils.isPureEmojiString(currText)) {
            messageTextStyle = {
                fontSize: 28,
                lineHeight: 34
            }
        }

        return <Message {...props}  />
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name: 'John Doe',
                avatar: 'https://placeimg.com/140/140/any'
            }}
            renderMessage={renderMessage}
        />
    )
}