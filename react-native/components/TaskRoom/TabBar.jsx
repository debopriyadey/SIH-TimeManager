import { View } from 'react-native';
import {
    Tabs,
    TabScreen,
} from 'react-native-paper-tabs';
import Chat from './Chat';
import { useEffect } from 'react';
import Tasks from './Tasks';

function TabBar() {
    useEffect(() => {
        renderChat();
    }, []);

    function renderChat() {
        return <Chat />
    }

    return (
        <Tabs>
            <TabScreen label="Chats" icon="message">
                {renderChat()}
            </TabScreen>
            <TabScreen label="Tasks" icon="checkbox-marked-circle-plus-outline">
                <Tasks />
            </TabScreen>
        </Tabs>
    )
}

export default TabBar;

