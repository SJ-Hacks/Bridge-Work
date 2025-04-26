import React, { useEffect, useState } from 'react';
import './App.css';

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    try {
      const response = await fetch(`http://localhost:8000/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
        }),
      });
      const data = await response.json();
      setTodos(todos.map(t => t._id === todo._id ? data : t));
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        
        <form onSubmit={handleCreateTodo} className="todo-form">
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
          <button type="submit">Add Todo</button>
        </form>

        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo._id} className="todo-item">
              {editingTodo?._id === todo._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editingTodo.description || ''}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                  />
                  <button onClick={() => handleUpdateTodo(editingTodo)}>Save</button>
                  <button onClick={() => setEditingTodo(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <div className="todo-content">
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
                  </div>
                  <div className="todo-actions">
                    <button onClick={() => setEditingTodo(todo)}>Edit</button>
                    <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
