import React, { useState, useEffect } from 'react';
import { View, Alert, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import TaskBox from './src/TaskBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import add from './src/Assets/add.png';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  // Load tasks from AsyncStorage when the app starts
  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    };

    loadTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    const updatedTasks = [...tasks, newTask.trim()];
    setTasks(updatedTasks);
    setNewTask('');
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = async (index: number) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: async () => {
            const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
            setTasks(updatedTasks);
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>To Do List</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 20, alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          onChangeText={text => setNewTask(text)}
          value={newTask}
          placeholder="Enter a task..."
        />
        <TouchableOpacity onPress={addTask}>
          <Image source={add} style={{ width: 45, height: 45 }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        {tasks.map((task, index) => (
          <TaskBox key={index} task={task} onDelete={() => deleteTask(index)} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Heading: {
    fontSize: 40,
    textAlign: 'center',
    margin: 15,
    color: '#000',
    fontFamily: 'cursive',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F1E5D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '85%',
    borderWidth: 1,
    backgroundColor: '#987070',
    borderColor: '#000',
    fontFamily: 'fantasy',
  }
});

export default App;