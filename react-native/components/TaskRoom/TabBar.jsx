import { View } from 'react-native';
import {
    Tabs,
    TabScreen,
} from 'react-native-paper-tabs';
import Chat from './Chat';

function TabBar() {
    return (
        <Tabs>
            <TabScreen label="Chats" icon="message">
                <View></View>              
            </TabScreen>
            <TabScreen label="Tasks" icon="checkbox-marked-circle-plus-outline">
                <View style={{ backgroundColor: 'black', flex: 1 }} />
            </TabScreen>
        </Tabs>
    )
}

export default TabBar;

