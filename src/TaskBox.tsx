import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import bin from './Assets/bin.png';

type TaskBoxProps = {
    task: string;
    onDelete: () => void;
};

const TaskBox: React.FC<TaskBoxProps> = ({ task, onDelete }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.buttonText}>{task}</Text>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <Image source={bin} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C39898',
        paddingHorizontal: 5,
        marginBottom: 8,
        borderColor: '#000',
        borderWidth: 1,
        width: '95%',
        marginHorizontal: '2.5%',
        flexDirection: 'row', // Align items in a row
        justifyContent: 'space-between', // Space between the text and the button
        alignItems: 'center', // Center items vertically
    },
    buttonText: {
        fontSize: 17,
        color: 'black',
        flex: 1,
        marginRight: 10,
        fontFamily: 'fantasy',
    },
    deleteButton: {
        padding: 5,
    },
});

export default TaskBox;