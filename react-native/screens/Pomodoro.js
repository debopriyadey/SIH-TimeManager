import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ImageBackground } from 'react-native';
import { Card, Modal, Portal, Button, Paragraph, Provider } from 'react-native-paper';
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
    const [visible, setVisible] = React.useState(false);
    const [breakVisible, setBreakVisible] = React.useState(false);
    const [workVisible, setWorkVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const showBreakModal = () => setBreakVisible(true);
    const hideBreakModal = () => setBreakVisible(false);
    const showWorkModal = () => setWorkVisible(true);
    const hideWorkModal = () => setWorkVisible(false);
    const containerStyle = { backgroundColor: 'white' , padding: 20,  borderRadius: 20, margin: 10 };

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
        if (timeIndex % 2 == 0) {
            showBreakModal()
            Notification.scheduleNotificationAsync({
                content: {
                    title: 'Short Break',
                    body: 'Time for a break!',
                },
                trigger: {
                    seconds: 0,
                },

            })
        } else {
            showWorkModal()
            Notification.scheduleNotificationAsync({
                content: {
                    title: 'Pomodoro',
                    body: 'Time for a Pomodoro!',
                },
                trigger: {
                    seconds: 1,
                },

            })
        }
    }

    const setTimerHandler = () => {
        hideModal()
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
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
            <Provider style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Portal style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    {/* Settings Modal */}
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text style={styles.heading}>Time (in minutes).</Text>
                        <View style={styles.quickContainer}>
                            <View style={styles.cards}>
                                <Text style={styles.text}>Pomodoro</Text>
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
                            </View>
                            <View style={styles.cards}>
                                <Text style={styles.text}>Short break</Text>
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
                            </View>
                            <View style={styles.cards}>
                                <Text style={styles.text}>Long break</Text>
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
                            </View>
                        </View>
                        <Button mode="contained" onPress={setTimerHandler}>
                            set
                        </Button>
                    </Modal>

                    {/* Working Modal */}
                    <Modal visible={workVisible} onDismiss={hideWorkModal} contentContainerStyle={containerStyle}>
                        <View style={styles.modalCont}>
                            <Text style={styles.heading}>Time for Pomodoro.</Text>
                            <Image
                                source={require('../assets/workingImg.png')}
                                resizeMode="contain"
                                style={{
                                    width: 300,
                                    height: 300,
                                }}
                            />
                            <Button mode="contained" onPress={hideWorkModal}>
                                Work
                            </Button>
                        </View>
                    </Modal>

                    {/* Break Modal */}
                    <Modal visible={breakVisible} onDismiss={hideBreakModal} contentContainerStyle={containerStyle}>
                        <View style={styles.modalCont}>
                            <Text style={styles.heading}>Time for your break.</Text>
                            <Image
                                source={require('../assets/breaksImg.png')}
                                resizeMode="contain"
                                style={{
                                    width: 250,
                                    height: 250,
                                }}
                            />
                            <Button mode="contained" onPress={hideBreakModal}>
                                Relax
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                
                <Button style={{ marginTop: 30 }} onPress={showModal}>
                    Settings
                </Button>
                <View style={styles.countdownCont}>
                    <CountdownCircleTimer
                        style={styles.countdown}
                        isPlaying={isPlaying}
                        key={timeIndex}
                        duration={timeIndex >= 0 ? parseInt(timeArray[timeIndex])*60 : 0}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[10, 6, 3, 0]}
                        onComplete={() => {
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
                </View>
                <View >
                    <Button mode="contained" style={styles.button} onPress={() => setIsPlaying(prev => !prev)} >
                        {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button mode="contained" style={styles.button} onPress={() => {
                        setIsPlaying(false)
                        setTimeIndex(-1)
                    }} >
                        Reset
                    </Button>
                    <Button mode="contained" style={styles.button} onPress={handleNotifications} >
                        notification
                    </Button>
                </View>
            </Provider>


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
        marginHorizontal: 5,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1f1f1f',
        padding: 8
    },
    text: {
        color: '#1f1f1f',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    quickContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
    },
    cards: {
        textAlign: 'center',
        margin: 10,
    },
    input: {
        fontSize: 32,
        textAlign: 'center',
        width: 80,
        height: 45,
    },
    modalCont: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdownCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdown: {
        width: '100%',
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