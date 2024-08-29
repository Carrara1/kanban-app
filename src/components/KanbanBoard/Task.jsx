import React from 'react';

const Task = ({ task, onDelete, onMoveLeft, onMoveRight }) => {
    if (!task || typeof task !== 'object') {
        console.error('Invalid task:', task);
        return null;
    }

    return (
        <div className="task">
            <p>{task.name || 'Unnamed Task'}</p>
            <div className="task-actions">
                <button onClick={onMoveLeft}>&lt;</button>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onMoveRight}>&gt;</button>
            </div>
        </div>
    );
};

export default Task;