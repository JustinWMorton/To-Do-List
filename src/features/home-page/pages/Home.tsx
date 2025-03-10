import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@contexts';
import './Home.css';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export function Home() {
    const { name } = useContext(UserContext);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem(`tasks_${name}`);
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, [name]);

    useEffect(() => {
        localStorage.setItem(`tasks_${name}`, JSON.stringify(tasks));
    }, [tasks, name]);

    const addTask = () => {
        if (newTask.trim() === '') {
            setErrorMessage('Task cannot be blank');
            return;
        }
        const newTaskObj = { id: Date.now(), title: newTask, completed: false };
        setTasks([...tasks, newTaskObj]);
        setNewTask('');
        setErrorMessage(''); // Clear the error message after adding a task
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    // Sort tasks so that completed tasks are at the bottom and not completed tasks are sorted by newest first
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed === b.completed) {
            return b.id - a.id; // Sort by newest first
        }
        return a.completed ? 1 : -1; // Move completed tasks to the bottom
    });

    return (
        <div className="home-container">
            <h1 className='header-text'>{name}'s To-Do List</h1>
            <div className="task-input-container">
                <input
                    type="text"
                    className="task-input"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new task"
                />
                <button className="add-task-button" onClick={addTask}>Add Task</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <ul className="task-list">
                {sortedTasks.map(task => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            className="task-checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                        />
                        <span className="task-title">{task.title}</span>
                        <button className="delete-task-button" onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}