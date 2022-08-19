import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

export default function CloseModal({hide}) {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={hide}
            // style={{flex: 1, justifyContent: 'flex-end'}}
            >
                <Image
                    source={require("../../icons/close.png")}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        marginTop: 10,
                        // flex: 1
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}
