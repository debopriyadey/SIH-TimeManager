import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RoutineForm from './RoutineForm'
// You can import from local files
// or any pure javascript modules available in npm
import { Searchbar, Avatar, Button, Card, Title, Paragraph, Chip, Portal, Provider, Modal } from 'react-native-paper';
import CloseModal from '../Common/CloseModal';

export default function RoutineList({ task }) {
    const [visible, setVisible] = React.useState(false);
    const [deatilVisible, setDetailVisible] = React.useState(false);
    const [curr, setCurr] = React.useState();
    const [isRoutineUpdate, setIsRoutineUpdate] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showDetailModal = () => setDetailVisible(true);
    const hideDetailModal = () => setDetailVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 10 };

    const createCopy = (task) => {
        setCurr(task)
        setIsRoutineUpdate(false)
        showDetailModal()
    }

    const createUpdate = (task) => {
        setCurr(task)
        setIsRoutineUpdate(true)
        showDetailModal()
    }

    const userId = '1234'

    return (
        <View>
            <View style={styles.resCardCont}>
                <Card style={styles.resCard}>
                    <Card.Content>
                        <View style={styles.inlineView}>
                            <Title>{task.title}</Title>
                            <Text>@{task.username}</Text>
                        </View>
                        <Paragraph>{task.desc}</Paragraph>
                        <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                            <Button mode="outlined" style={styles.btn}>
                                <Text style={styles.btnText}>Schedule</Text>
                            </Button>
                            {/* {(task.canEdit === "everyone" || (task.canEdit === "only_with" && task.sharedWith.includes(userId))) &&
                                <Button mode="outlined" style={styles.btn} onPress={() => createUpdate(task)}>
                                    <Text style={styles.btnText}>Update</Text>
                                </Button>
                            }
                            <Button mode="outlined" style={styles.btn} onPress={() => createCopy(task)}>
                                <Text style={styles.btnText}>Create Copy</Text>
                            </Button> */}
                        </View>
                    </Card.Content>
                </Card>
            </View>
            <Portal
                style={{ flex: 1, justifyContent: "flex-start", alignItems: 'flex-start' }}
            >
                <Modal visible={deatilVisible} onDismiss={hideDetailModal} contentContainerStyle={containerStyle}>
                    <CloseModal hide={hideDetailModal} />
                    <RoutineForm task={curr} isRoutineUpdate={isRoutineUpdate} />
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
        margin: 5,
        borderRadius: 15,
    },
    btnText: {
        fontSize: wp("2%"),
    }
});
