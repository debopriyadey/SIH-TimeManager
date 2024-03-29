import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BucketTaskForm from './BucketTaskForm'
// You can import from local files
// or any pure javascript modules available in npm
import { Searchbar, Avatar, Button, Card, Title, Paragraph, Chip, Portal, Provider, Modal } from 'react-native-paper';
import { SHARING_TYPE } from '../../constants';
import { useSelector } from 'react-redux';

export default function BucketList({ task }) {
    const [visible, setVisible] = React.useState(false);
    const [deatilVisible, setDetailVisible] = React.useState(false);
    const [curr, setCurr] = React.useState();
    const [isUpdate, setIsUpdate] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showDetailModal = () => setDetailVisible(true);
    const hideDetailModal = () => setDetailVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 10 };

    const createCopy = (task) => {
        setCurr(task)
        setIsUpdate(false)
        showDetailModal()
    }

    const createUpdate = (task) => {
        setCurr(task)
        setIsUpdate(true)
        showDetailModal()
    }

    const userId = useSelector((state) => state.user?._id)

    return (
        <View>
            <View style={styles.resCardCont}>
                <Card style={styles.resCard}>
                    <Card.Content>
                        <View style={styles.inlineView}>
                            <Title>{task.title}</Title>
                            <Text>@{task.username}</Text>
                        </View>
                        <Paragraph>{task.description}</Paragraph>
                        <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                            <Button mode="contained" style={styles.btn}>
                                <Text style={styles.btnText}>Schedule</Text>
                            </Button>
                            {(task.canEdit === SHARING_TYPE.EVERYONE || (task.canEdit === SHARING_TYPE.ONLY_WITH && task.sharedWith.findIndex((x) => x._id===userId)!=-1 ) || (task.creatorId === userId)) &&
                                <Button mode="contained" style={styles.btn} onPress={() => createUpdate(task)}>
                                    <Text style={styles.btnText}>Update</Text>
                                </Button>
                            }
                            <Button mode="contained" style={styles.btn} onPress={() => createCopy(task)}>
                                <Text style={styles.btnText}>Create Copy</Text>
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
            </View>
            <Portal
                style={{ flex: 1, justifyContent: "flex-start", alignItems: 'flex-start' }}
            >
                <Modal visible={deatilVisible} onDismiss={hideDetailModal} contentContainerStyle={containerStyle}>
                    <BucketTaskForm task={curr} isUpdate={isUpdate} />
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    inlineView: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'baseline',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: 10,
    },
    resCardCont: {
        margin: 8,
    },
    resCard: {
        marginVertical: 5,
    },
    btn: {
        padding: 0,
        margin: 2
    },
    btnText: {
        fontSize: wp("2%"),
    }
});
