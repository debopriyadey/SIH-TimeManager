import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../redux/slice/userSlice';
import * as api from '../api'
export function DrawerContent(props) {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const paperTheme = useTheme();
    const handleSignout = async() => {
        try {
            const data = {token}
            console.log("logged out handler")
            await AsyncStorage.removeItem("userToken");
            await api.signout(data)
            dispatch(signout())
        } catch (error) {
            console.log("got error while signout!.",  error.response )
            Alert.alert('Wrong Input!',  error.response?.data?.error || "something went wrong.", [
                { text: 'Okay' }
            ]);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            {/* <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            /> */}
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>@j_doe</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Entypo name="home" size={24} color="black" />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="person-circle-outline" size={24} color="black" />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="person-circle-outline" size={24} color="black" />
                            )}
                            label="Audio"
                            onPress={() => { props.navigation.navigate('AudioScreen') }}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Ionicons name="person-circle-outline" size={24} color="black" />
                            )}
                            label="Details"
                            onPress={() => { props.navigation.navigate('Details') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Entypo name="bookmark" size={24} color="black" />
                            )}
                            label="Bookmarks"
                            onPress={() => { props.navigation.navigate('BookmarkScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="settings" size={24} color="black" />
                            )}
                            label="Settings"
                            onPress={() => { props.navigation.navigate('SettingsScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="checkmark-circle" size={24} color="black" />
                            )}
                            label="Support"
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="checkmark-circle" size={24} color="black" />
                            )}
                            label="Child"
                            onPress={() => { props.navigation.navigate('ParentControl') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons name="logout" size={24} color="black" />
                    )}
                    label="Sign Out"
                    onPress={handleSignout}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
