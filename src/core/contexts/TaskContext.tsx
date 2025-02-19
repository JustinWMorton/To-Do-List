import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}

interface TaskContextProps {
    tasks: Task[];
    addTask: (title: string) => void;
    toggleTask: (id: number) => void;
    clearTasks: () => void; // Add clearTasks to the context props
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string) => {
        setTasks([...tasks, { id: Date.now(), title, completed: false, createdAt: new Date() }]);
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const clearTasks = () => {
        setTasks([]);
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, clearTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = React.useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};