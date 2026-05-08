import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ExternalLink, MapPin, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { savedAPI } from '../api/services';

const SavedColleges = () => {
  const [savedColleges, setSavedColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedColleges();
  }, []);

  const fetchSavedColleges = async () => {
    try {
      const { data } = await savedAPI.getAll();
      setSavedColleges(data.savedColleges);
    } catch (error) {
      toast.error('Failed to load saved colleges');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (collegeId) => {
    try {
      await savedAPI.unsave(collegeId);
      setSavedColleges(savedColleges.filter(c => c.id !== collegeId));
      toast.success('College removed from saved list');
    } catch (error) {
      toast.error('Failed to remove college');
    }
  };

  return (
    <div className="saved-page" style={{ padding: '3rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Saved Colleges</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Manage your shortlist of colleges here.
        </p>

        {loading ? (
          <div className="loader"></div>
        ) : savedColleges.length === 0 ? (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', borderStyle: 'dashed' }}>
            <h2 style={{ marginBottom: '1rem' }}>No saved colleges yet</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Explore colleges and add them to your saved list to keep track of your favorites.
            </p>
            <Link to="/" className="btn btn-primary">Explore Colleges</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2">
            {savedColleges.map((college) => (
              <div key={college.id} className="card" style={{ display: 'flex', flexDirection: 'row', padding: '1rem', gap: '1.5rem', alignItems: 'center' }}>
                <img 
                  src={college.image_url} 
                  alt={college.name} 
                  style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} 
                />
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Link to={`/college/${college.id}`} style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>
                      {college.name}
                    </Link>
                    <button onClick={() => handleUnsave(college.id)} className="btn btn-outline" style={{ padding: '0.5rem', color: 'var(--error-color)', borderColor: 'var(--error-color)' }} title="Remove">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={14} /> {college.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning-color)' }}>
                      <Star size={14} fill="currentColor" /> {college.rating}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/college/${college.id}`} className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedColleges;
