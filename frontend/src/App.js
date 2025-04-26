import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gigs, setGigs] = useState([]);
  const [newGig, setNewGig] = useState({
    title: '',
    description: '',
    location: '',
    points: 0,
    is_active: true
  });
  const [editingGig, setEditingGig] = useState(null);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/gigs');
      const data = await response.json();
      setGigs(data);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };

  const handleCreateGig = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/gigs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGig),
      });
      const data = await response.json();
      setGigs([...gigs, data]);
      setNewGig({
        title: '',
        description: '',
        location: '',
        points: 0,
        is_active: true
      });
    } catch (error) {
      console.error('Error creating gig:', error);
    }
  };

  const handleUpdateGig = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/gigs/${editingGig._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingGig),
      });
      const data = await response.json();
      setGigs(gigs.map(gig => gig._id === editingGig._id ? data : gig));
      setEditingGig(null);
    } catch (error) {
      console.error('Error updating gig:', error);
    }
  };

  const handleDeleteGig = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/gigs/${id}`, {
        method: 'DELETE',
      });
      setGigs(gigs.filter(gig => gig._id !== id));
    } catch (error) {
      console.error('Error deleting gig:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bridge Works Gigs</h1>
        
        <form onSubmit={editingGig ? handleUpdateGig : handleCreateGig} className="gig-form">
          <input
            type="text"
            placeholder="Title"
            value={editingGig ? editingGig.title : newGig.title}
            onChange={(e) => editingGig 
              ? setEditingGig({...editingGig, title: e.target.value})
              : setNewGig({...newGig, title: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={editingGig ? editingGig.description : newGig.description}
            onChange={(e) => editingGig
              ? setEditingGig({...editingGig, description: e.target.value})
              : setNewGig({...newGig, description: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={editingGig ? editingGig.location : newGig.location}
            onChange={(e) => editingGig
              ? setEditingGig({...editingGig, location: e.target.value})
              : setNewGig({...newGig, location: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Points"
            value={editingGig ? editingGig.points : newGig.points}
            onChange={(e) => editingGig
              ? setEditingGig({...editingGig, points: parseInt(e.target.value)})
              : setNewGig({...newGig, points: parseInt(e.target.value)})}
            required
          />
          <button type="submit">{editingGig ? 'Update Gig' : 'Add Gig'}</button>
          {editingGig && (
            <button type="button" onClick={() => setEditingGig(null)}>Cancel</button>
          )}
        </form>

        <div className="gig-list">
          {gigs.map((gig) => (
            <div key={gig._id} className="gig-item">
              <div className="gig-content">
                <h3>{gig.title}</h3>
                <p>{gig.description}</p>
                <p>Location: {gig.location}</p>
                <p>Points: {gig.points}</p>
                <p>Status: {gig.is_active ? 'Active' : 'Inactive'}</p>
              </div>
              <div className="gig-actions">
                <button onClick={() => setEditingGig(gig)}>Edit</button>
                <button onClick={() => handleDeleteGig(gig._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App; 