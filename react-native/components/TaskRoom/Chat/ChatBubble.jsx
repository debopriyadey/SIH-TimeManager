import PropTypes from 'prop-types'
import React from 'react'
import {
    Text,
    Clipboard,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewPropTypes,
    Platform,
} from 'react-native'

import {
    MessageText,
    MessageImage,
    Time,
    utils,
} from 'react-native-gifted-chat'

const { isSameUser, isSameDay } = utils;


const Bubble = (props) => {
    function onLongPress() {
        if (props.onLongPress) {
            props.onLongPress(context, props.currentMessage)
        } else {
            if (props.currentMessage.text) {
                const options = ['Copy Text', 'Cancel']
                const cancelButtonIndex = options.length - 1
            }
        }
    }

    function renderMessageText() {
        if (props.currentMessage.text) {
            const {
                containerStyle,
                wrapperStyle,
                messageTextStyle,
                ...messageTextProps
            } = props
            if (props.renderMessageText) {
                return props.renderMessageText(messageTextProps)
            }
            return (
                <MessageText
                    {...messageTextProps}
                    textStyle={{
                        left: [
                            styles.standardFont,
                            styles.slackMessageText,
                            messageTextProps.textStyle,
                            messageTextStyle,
                        ],
                    }}
                />
            )
        }
        return null
    }

    function renderMessageImage() {
        if (props.currentMessage.image) {
            const { containerStyle, wrapperStyle, ...messageImageProps } = props
            if (props.renderMessageImage) {
                return props.renderMessageImage(messageImageProps)
            }
            return (
                <MessageImage
                    {...messageImageProps}
                    imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
                />
            )
        }
        return null
    }

    function renderTicks() {
        const { currentMessage } = props
        if (props.renderTicks) {
            return props.renderTicks(currentMessage)
        }
        if (currentMessage.user._id !== props.user._id) {
            return null
        }
        if (currentMessage.sent || currentMessage.received) {
            return (
                <View style={[styles.headerItem, styles.tickView]}>
                    {currentMessage.sent && (
                        <Text
                            style={[styles.standardFont, styles.tick, props.tickStyle]}
                        >
                            ✓
                        </Text>
                    )}
                    {currentMessage.received && (
                        <Text
                            style={[styles.standardFont, styles.tick, props.tickStyle]}
                        >
                            ✓
                        </Text>
                    )}
                </View>
            )
        }
        return null
    }

    function renderUsername() {
        const username = props.currentMessage.user.name
        if (username) {
            const { containerStyle, wrapperStyle, ...usernameProps } = props
            if (props.renderUsername) {
                return props.renderUsername(usernameProps)
            }
            return (
                <Text
                    style={[
                        styles.standardFont,
                        styles.headerItem,
                        styles.username,
                        props.usernameStyle,
                    ]}
                >
                    {username}
                </Text>
            )
        }
        return null
    }

    function renderTime() {
        if (props.currentMessage.createdAt) {
            const { containerStyle, wrapperStyle, ...timeProps } = props
            if (props.renderTime) {
                return props.renderTime(timeProps)
            }
            return (
                <Time
                    {...timeProps}
                    containerStyle={{ left: [styles.timeContainer] }}
                    textStyle={{
                        left: [
                            styles.standardFont,
                            styles.headerItem,
                            styles.time,
                            timeProps.textStyle,
                        ],
                    }}
                />
            )
        }
        return null
    }

    function renderCustomView() {
        if (props.renderCustomView) {
            return props.renderCustomView(props)
        }
        return null
    }

    const isSameThread =
        isSameUser(props.currentMessage, props.previousMessage) &&
        isSameDay(props.currentMessage, props.previousMessage)

    const messageHeader = isSameThread ? null : (
        <View style={styles.headerView}>
            {renderUsername()}
            {renderTime()}
            {renderTicks()}
        </View>
    )

    return (
        <View style={[styles.container, props.containerStyle]}>
            <TouchableOpacity
                onLongPress={onLongPress}
                accessibilityTraits='text'
                {...props.touchableProps}
            >
                <View style={[styles.wrapper, props.wrapperStyle]}>
                    <View>
                        {renderCustomView()}
                        {messageHeader}
                        {renderMessageImage()}
                        {renderMessageText()}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Bubble;

const styles = StyleSheet.create({
    standardFont: {
        fontSize: 15,
    },
    slackMessageText: {
        marginLeft: 0,
        marginRight: 0,
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    wrapper: {
        marginRight: 60,
        minHeight: 20,
        justifyContent: 'flex-end',
    },
    username: {
        fontWeight: 'bold',
    },
    time: {
        textAlign: 'left',
        fontSize: 12,
    },
    timeContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
    headerItem: {
        marginRight: 10,
    },
    headerView: {
        // Try to align it better with the avatar on Android.
        marginTop: Platform.OS === 'android' ? -2 : 0,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    /* eslint-disable react-native/no-color-literals */
    tick: {
        backgroundColor: 'transparent',
        color: 'white',
    },
    /* eslint-enable react-native/no-color-literals */
    tickView: {
        flexDirection: 'row',
    },
    slackImage: {
        borderRadius: 3,
        marginLeft: 0,
        marginRight: 0,
    },
})

