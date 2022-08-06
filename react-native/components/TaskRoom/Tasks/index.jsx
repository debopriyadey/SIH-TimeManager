import { View, Text } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import TaskList from './TaskList';

const dummyTasks = [
    {
        id: 1,
        content: 'Finish Homework',
        status: 'pending'
    },
    {
        id: 2,
        content: 'Do a Leetcode question',
        status: 'pending'
    },
    {
        id: 3,
        content: 'Buy Perfume',
        status: 'completed'
    }
]

const Tasks = () => {
    const [lists, setLists] = useState({
        all: [],
        completed: []
    });

    useLayoutEffect(() => {
        const tasks = {
            all: [],
            completed: []
        }
        dummyTasks.forEach(task => {
            if (task.status === 'pending')
                tasks.all.push(task);
            else
                tasks.completed.push(task);
        });
        setLists(tasks);
    }, []);

    return (
        <View>
            {
                Object.entries(lists)
                .map(([key, value], idx) =>
                    <TaskList key={idx} list={[key, value]} />
                )
            }

        </View>
    )
}

export default Tasks