import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
// //  import FontAwesome from '../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf';
//// import Feather from '../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf';
import { useTheme } from 'react-native-paper';
import { signin } from '../redux/slice/userSlice';
import * as api from '../api'
import { useDispatch, useSelector } from 'react-redux';


const Focus = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const [musicList, setMusicList] = React.useState([
        {
            title: 'Motivation',
            locked: false
        },
        {
            title: 'Concentration',
            locked: false
        },
        {
            title: 'Relax',
            locked: true
        },
    ])

    const [currMusic, setCurrMusic] = React.useState({
        title: '',
    })

    const { colors } = useTheme();
    const dispatch = useDispatch();

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async () => {
        const payload = data;

        try {
            const { data } = await api.signin(payload);
            console.log("got response for signin!", data)
            await AsyncStorage.setItem('userToken', data.user.token);
            dispatch(signin(data.user));
        } catch (error) {
            console.log("got error in signin!", error.response.data)
            Alert.alert('Wrong Input!', error.response?.data?.error || "something went wrong.", [
                { text: 'Okay' }
            ]);
        }

        // if (foundUser.length == 0) {
        //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        //         { text: 'Okay' }
        //     ]);
        //     return;
        // }
        // signIn(foundUser);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#3D5CFF' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Choose Your Music</Text>
                <Text>Total Focus Time: 2 hours </Text>
                <View>
                    {musicList.map((music) => {
                        <View style={{ flex: 1, justifyContent: 'space-around' }}>
                            <Text>{music.title}</Text>
                        </View>
                    })}
                </View>
            </Animatable.View>
        </View>
    );
};

export default Focus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D5CFF'
    },
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
