import React, { useState, useEffect } from 'react';
import ProjectList from './components/Sidebar/ProjectList';
import Board from './components/KanbanBoard/Board';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import './styles/index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project A', tasks: {} },
    { id: 2, name: 'Project B', tasks: {} },
    { id: 3, name: 'Project C', tasks: {} },
  ]);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch user data here
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  const handleLogoff = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleRegister = () => {
    setShowRegister(false);
  };

  const handleDeleteTask = (taskId, columnId) => {
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === currentProjectId) {
        const updatedTasks = { ...project.tasks };
        updatedTasks[columnId] = updatedTasks[columnId].filter(task => task.id !== taskId);
        return { ...project, tasks: updatedTasks };
      }
      return project;
    }));
  };

  const handleMoveTask = (taskId, sourceColumnId, targetColumnId) => {
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === currentProjectId) {
        const updatedTasks = { ...project.tasks };
        const taskToMove = updatedTasks[sourceColumnId].find(task => task.id === taskId);
        updatedTasks[sourceColumnId] = updatedTasks[sourceColumnId].filter(task => task.id !== taskId);
        updatedTasks[targetColumnId] = [...(updatedTasks[targetColumnId] || []), taskToMove];
        return { ...project, tasks: updatedTasks };
      }
      return project;
    }));
  };

  const handleRenameProject = (projectId, newName) => {
    setProjects(prevProjects => prevProjects.map(project =>
      project.id === projectId ? { ...project, name: newName } : project
    ));
  };

  const handleSetTasks = (newTasks) => {
    setProjects(prevProjects => prevProjects.map(project =>
      project.id === currentProjectId ? { ...project, tasks: newTasks } : project
    ));
  };

  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onLoginClick={() => setShowRegister(false)}
        />
      );
    } else {
      return (
        <LoginPage
          onLogin={handleLogin}
          onRegisterClick={() => setShowRegister(true)}
        />
      );
    }
  }

  const currentProject = projects.find(p => p.id === currentProjectId);

  return (
    <div className="app">
      <div className="sidebar">
        <ProjectList
          projects={projects}
          currentProjectId={currentProjectId}
          setCurrentProjectId={setCurrentProjectId}
          onRenameProject={handleRenameProject}
        />
        <button className="btn-logoff" onClick={handleLogoff}>Log Off</button>
      </div>
      <main className="main-content">
        {currentProject ? (
          <Board
            currentProject={currentProject}
            tasks={currentProject.tasks}
            setTasks={handleSetTasks}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            user={user}
          />
        ) : (
          <div className="empty-state">
            <h2>Welcome to Your Kanban Board, {user ? user.name : 'Guest'}</h2>
            <p>Select a project from the sidebar to view tasks</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
