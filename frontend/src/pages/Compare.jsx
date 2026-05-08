import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, PlusCircle, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { collegeAPI } from '../api/services';
import './Compare.css';

const Compare = () => {
  const [compareIds, setCompareIds] = useState(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allColleges, setAllColleges] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchAllColleges();
  }, []);

  useEffect(() => {
    if (compareIds.length > 0) {
      fetchCompareData();
    } else {
      setColleges([]);
    }
    localStorage.setItem('compareList', JSON.stringify(compareIds));
  }, [compareIds]);

  const fetchCompareData = async () => {
    setLoading(true);
    try {
      const { data } = await collegeAPI.compare(compareIds);
      setColleges(data.colleges);
    } catch (error) {
      toast.error('Failed to load compare data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllColleges = async () => {
    try {
      const { data } = await collegeAPI.getAll({});
      setAllColleges(data.colleges);
    } catch (error) {
      console.error('Failed to load all colleges');
    }
  };

  const handleRemove = (id) => {
    setCompareIds(compareIds.filter(cid => cid !== id));
  };

  const handleAdd = (id) => {
    if (compareIds.length >= 3) {
      toast.error('You can only compare up to 3 colleges');
      return;
    }
    if (!compareIds.includes(id)) {
      setCompareIds([...compareIds, id]);
      setShowAddModal(false);
    }
  };

  return (
    <div className="compare-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Compare Colleges</h1>
          <p className="page-subtitle">Make an informed decision by comparing fees, placements, ratings, and more side-by-side.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {compareIds.length === 0 ? (
          <div className="empty-compare">
            <div className="empty-icon-wrapper">
              <PlusCircle size={64} className="text-tertiary" />
            </div>
            <h2>No Colleges Selected</h2>
            <p>Add colleges to your compare list to see them here.</p>
            <button className="btn btn-primary mt-4" onClick={() => setShowAddModal(true)}>
              Add Colleges to Compare
            </button>
          </div>
        ) : (
          <div className="compare-container">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <div className="compare-table-wrapper">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th className="feature-col">Features</th>
                      {colleges.map(college => (
                        <th key={college.id} className="college-col">
                          <div className="compare-college-header">
                            <button className="remove-btn" onClick={() => handleRemove(college.id)} title="Remove">
                              <Trash2 size={16} />
                            </button>
                            <img src={college.image_url} alt={college.name} className="compare-img" />
                            <Link to={`/college/${college.id}`} className="compare-name">{college.name}</Link>
                            <span className="compare-location">{college.location}</span>
                          </div>
                        </th>
                      ))}
                      {colleges.length < 3 && (
                        <th className="college-col add-col">
                          <button className="add-college-btn" onClick={() => setShowAddModal(true)}>
                            <PlusCircle size={32} />
                            <span>Add College</span>
                          </button>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="feature-name">Type</td>
                      {colleges.map(c => <td key={c.id}>{c.type}</td>)}
                      {colleges.length < 3 && <td className="empty-cell"></td>}
                    </tr>
                    <tr>
                      <td className="feature-name">Rating</td>
                      {colleges.map(c => <td key={c.id} className="font-bold text-warning">{c.rating} / 5</td>)}
                      {colleges.length < 3 && <td className="empty-cell"></td>}
                    </tr>
                    <tr>
                      <td className="feature-name">Average Fees / Year</td>
                      {colleges.map(c => <td key={c.id} className="font-bold text-primary">₹{c.fees_per_year.toLocaleString()}</td>)}
                      {colleges.length < 3 && <td className="empty-cell"></td>}
                    </tr>
                    <tr>
                      <td className="feature-name">Placement Rate</td>
                      {colleges.map(c => <td key={c.id} className="font-bold text-success">{c.placement_percentage}%</td>)}
                      {colleges.length < 3 && <td className="empty-cell"></td>}
                    </tr>
                    <tr>
                      <td className="feature-name">Established</td>
                      {colleges.map(c => <td key={c.id}>{c.established_year}</td>)}
                      {colleges.length < 3 && <td className="empty-cell"></td>}
                    </tr>
                    <tr>
                      <td className="feature-name">Top Courses</td>
                      {colleges.map(c => (
                        <td key={c.id}>
                          <ul className="compare-courses">
                            {c.courses?.slice(0, 3).map((course, i) => (
                              <li key={i}><Check size={14} className="text-success" /> {course}</li>
                            ))}
                            {c.courses?.length > 3 && <li><small>+ {c.courses.length - 3} more</small></li>}
                          </ul>
                        </td>
                      ))}
                      {colleges.length < 3 && <td className="empty-cell"></td>}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select College to Compare</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-list">
                {allColleges.map(c => {
                  const isAdded = compareIds.includes(c.id);
                  return (
                    <div key={c.id} className={`modal-item ${isAdded ? 'disabled' : ''}`}>
                      <div className="modal-item-info">
                        <strong>{c.name}</strong>
                        <span>{c.location}</span>
                      </div>
                      <button 
                        className={`btn ${isAdded ? 'btn-outline' : 'btn-primary'}`}
                        onClick={() => !isAdded && handleAdd(c.id)}
                        disabled={isAdded}
                      >
                        {isAdded ? 'Added' : 'Add'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
