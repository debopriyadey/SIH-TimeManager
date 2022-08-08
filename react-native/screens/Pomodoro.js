import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ImageBackground } from 'react-native';
import { Card, Title, Avatar, Button, Paragraph } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Constants from 'expo-constants';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import meetup from '../assets/Meetup.svg'
import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import {
    inputTypes,
    PossibleClockTypes,
    PossibleInputTypes,
    useInputColors,
} from './timeUtils'

Notification.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        };
    }
})

const Pomodoro = ({ navigation }) => {
    const [timeArray, setTimeArray] = React.useState([0, 0, 0, 0, 0, 0])
    const [timeInput, setTimeInput] = React.useState({
        pomodoroTime: 0,
        shortBreakTime: 0,
        longBreakTime: 0,
    })
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [timeIndex, setTimeIndex] = React.useState(-1)

    const { colors } = useTheme();

    const onInnerChange = (text, key) => {
        setTimeInput({
            ...timeInput,
            [key]: text
        })

    }

   useEffect(() => {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then((response) => {
            if (response.status !== 'granted') {
                return Permissions.askAsync(Permissions.NOTIFICATIONS)
            }
            return response
        }).then((response) => {
            if (response.status !== 'granted') {
                return;
            }
            return response
        })
    }, []);
    const handleNotifications = () => {
        Notification.scheduleNotificationAsync({
            content: {
                title: 'Pomodoro',
                body: 'Time for a break!',
            },
            trigger: {
                seconds: 1,
            },

        })
    }

    const setTimerHandler = () => {
        const timeArray = [timeInput.pomodoroTime, timeInput.shortBreakTime, timeInput.pomodoroTime, timeInput.shortBreakTime, timeInput.pomodoroTime, timeInput.longBreakTime]
        setTimeArray(timeArray)
        setTimeIndex(0)
    }
    const theme = useTheme();
    const highlighted = inputFocused

    const { color, backgroundColor } = useInputColors(highlighted)
    const [inputFocused, setInputFocused] = React.useState(false)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

                <View style={styles.quickContainer}>
                    <Card style={styles.cards}>
                        <Text>Pomodoro</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color,
                                    backgroundColor,
                                    borderRadius: theme.roundness,
                                },
                            ]}
                            value={timeInput.pomodoroTime.toString()}
                            maxLength={2}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            keyboardAppearance={theme.dark ? 'dark' : 'default'}
                            keyboardType="number-pad"
                            onChangeText={(text) => onInnerChange(text, 'pomodoroTime')}
                        />
                    </Card>
                    <Card style={styles.cards}>
                        <Text>short break</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color,
                                    backgroundColor,
                                    borderRadius: theme.roundness,
                                },
                            ]}
                            value={timeInput.shortBreakTime.toString()}
                            maxLength={2}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            keyboardAppearance={theme.dark ? 'dark' : 'default'}
                            keyboardType="number-pad"
                            onChangeText={(text) => onInnerChange(text, 'shortBreakTime')}
                        />
                    </Card>
                    <Card style={styles.cards}>
                        <Text>long break</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    color,
                                    backgroundColor,
                                    borderRadius: theme.roundness,
                                },
                            ]}
                            value={timeInput.longBreakTime.toString()}
                            maxLength={2}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            keyboardAppearance={theme.dark ? 'dark' : 'default'}
                            keyboardType="number-pad"
                            onChangeText={(text) => onInnerChange(text, 'longBreakTime')}
                        />
                    </Card>


                </View>
                <View >
                    <Button mode="contained" onPress={setTimerHandler}>
                        set
                        </Button>
                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        key={timeIndex}
                        duration={ timeIndex>=0 ? parseInt(timeArray[timeIndex]) : 0}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[10, 6, 3, 0]}
                        onComplete = {() => {
                            setTimeout(() => {
                             let newTimeIndex = 0;
                             setTimeIndex((timeIndex) => newTimeIndex = (timeIndex + 1) % timeArray.length);
                             setIsPlaying(false);
                             handleNotifications();
                            }, 0)
                        }}
                    >
                        {({ remainingTime, color }) => {
                            const minutes = Math.floor(remainingTime / 60)
                            const seconds = remainingTime % 60

                            return (
                                <Text style={{ color, fontSize: 40 }}>
                                    {minutes}:{seconds}
                                </Text>
                            )

                        }}
                    </CountdownCircleTimer>
                    <Button mode="contained" style={styles.button}  onPress={() => setIsPlaying(prev => !prev)} >
                        {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                     <Button mode="contained" style={styles.button}  onPress={() => {
                        setIsPlaying(false)
                        setTimeIndex(-1)
                     }} >
                        Reset
                    </Button>
                <Button mode="contained" style={styles.button}  onPress={handleNotifications} >
                        notification
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>

     
    );
};

export default Pomodoro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },

    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 5,
    },

    quickContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#385cff',
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
    },

    input: {
        fontSize: 22,
        textAlign: 'center',
        width: 80,
        height: 30,
        margin: 'auto',
    },

    cards: {
        width: '30%',
        margin: 5,
        flexDirection: 'row',
        backgroundColor: '#555',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 10,
    }

});