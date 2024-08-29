import React, { useState } from 'react';

const ProjectList = ({ projects, currentProjectId, setCurrentProjectId, onRenameProject }) => {
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [editedName, setEditedName] = useState('');

    const handleRenameClick = (project) => {
        setEditingProjectId(project.id);
        setEditedName(project.name);
    };

    const handleRenameSubmit = (e) => {
        e.preventDefault();
        onRenameProject(editingProjectId, editedName);
        setEditingProjectId(null);
    };

    return (
        <div className="project-list">
            <h2>Projects</h2>
            <ul>
                {projects.map(project => (
                    <li key={project.id} className={project.id === currentProjectId ? 'active' : ''}>
                        {editingProjectId === project.id ? (
                            <form onSubmit={handleRenameSubmit}>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onBlur={handleRenameSubmit}
                                    autoFocus
                                />
                            </form>
                        ) : (
                            <>
                                <span onClick={() => setCurrentProjectId(project.id)}>{project.name}</span>
                                <button onClick={() => handleRenameClick(project)}>Rename</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;