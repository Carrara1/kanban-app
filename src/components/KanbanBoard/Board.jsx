import React from 'react';
import Column from './Column';

const Board = ({ currentProject, tasks, setTasks, onDeleteTask, onMoveTask, user }) => {
    const columns = ['To Do', 'In Progress', 'Done'];

    const handleAddTask = (columnId, taskName) => {
        const newTask = {
            id: Date.now(),
            name: taskName,
        };
        setTasks({
            ...tasks,
            [columnId]: [...(tasks[columnId] || []), newTask],
        });
    };

    const handleMoveLeft = (taskId, columnIndex) => {
        if (columnIndex > 0) {
            onMoveTask(taskId, columns[columnIndex], columns[columnIndex - 1]);
        }
    };

    const handleMoveRight = (taskId, columnIndex) => {
        if (columnIndex < columns.length - 1) {
            onMoveTask(taskId, columns[columnIndex], columns[columnIndex + 1]);
        }
    };

    return (
        <div className="board">
            <h2>Welcome to {currentProject.name}, {user ? user.name : 'Guest'}</h2>
            <div className="columns">
                {columns.map((column, index) => (
                    <Column
                        key={column}
                        title={column}
                        tasks={tasks[column] || []}
                        onAddTask={(taskName) => handleAddTask(column, taskName)}
                        onDeleteTask={(taskId) => onDeleteTask(taskId, column)}
                        onMoveLeft={(taskId) => handleMoveLeft(taskId, index)}
                        onMoveRight={(taskId) => handleMoveRight(taskId, index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;