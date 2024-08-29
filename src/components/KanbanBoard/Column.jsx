import React, { useState } from 'react';
import Task from './Task';

const Column = ({ title, tasks, onAddTask, onDeleteTask, onMoveLeft, onMoveRight }) => {
    const [newTaskName, setNewTaskName] = useState('');

    console.log('Tasks in Column:', JSON.stringify(tasks, null, 2));

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTaskName.trim()) {
            onAddTask(newTaskName);
            setNewTaskName('');
        }
    };

    return (
        <div className="column">
            <h3>{title}</h3>
            <div className="task-list">
                {Array.isArray(tasks) ? (
                    tasks.map((task) => {
                        console.log('Rendering task:', JSON.stringify(task, null, 2));
                        return (
                            <Task
                                key={task.id}
                                task={task}
                                onDelete={() => onDeleteTask(task.id)}
                                onMoveLeft={() => onMoveLeft(task.id)}
                                onMoveRight={() => onMoveRight(task.id)}
                            />
                        );
                    })
                ) : (
                    <p>No tasks available</p>
                )}
            </div>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default Column;