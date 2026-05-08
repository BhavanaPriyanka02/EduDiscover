import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Star, ShieldCheck } from 'lucide-react';
import { collegeAPI } from '../api/services';
import './Home.css';

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    fetchLocations();
    fetchColleges();
  }, [search, location, sort]);

  const fetchLocations = async () => {
    try {
      const { data } = await collegeAPI.getLocations();
      setLocations(data.locations);
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  };

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const { data } = await collegeAPI.getAll({ search, location, sort });
      setColleges(data.colleges);
    } catch (error) {
      console.error("Error fetching colleges", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Find Your Dream College</h1>
          <p className="hero-subtitle">Discover top colleges, compare fees, check placements, and make the right choice for your future.</p>
          
          <div className="search-bar-container">
            <div className="search-input-group">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search colleges by name..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <MapPin className="filter-icon" />
              <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="filter-select"
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <Star className="filter-icon" />
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                className="filter-select"
              >
                <option value="rating">Top Rated</option>
                <option value="fees_low">Fees: Low to High</option>
                <option value="fees_high">Fees: High to Low</option>
                <option value="placement">Best Placements</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="section-header">
          <h2>Top Colleges in India</h2>
          <p>Explore the best institutions for your higher education journey.</p>
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="grid grid-cols-3">
            {colleges.length > 0 ? (
              colleges.map(college => (
                <div key={college.id} className="college-card">
                  <div className="card-image-container">
                    <img src={college.image_url} alt={college.name} className="card-image" />
                    <div className="card-rating">
                      <Star size={14} fill="currentColor" /> {college.rating}
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{college.name}</h3>
                    <div className="card-meta">
                      <span className="meta-item"><MapPin size={14} /> {college.location}</span>
                      <span className="meta-item"><ShieldCheck size={14} /> {college.type}</span>
                    </div>
                    
                    <div className="card-stats">
                      <div className="stat-box">
                        <span className="stat-label">Fees / Year</span>
                        <span className="stat-value"><IndianRupee size={14} />{college.fees_per_year.toLocaleString()}</span>
                      </div>
                      <div className="stat-box">
                        <span className="stat-label">Placement</span>
                        <span className="stat-value">{college.placement_percentage}%</span>
                      </div>
                    </div>
                    
                    <Link to={`/college/${college.id}`} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                <h3>No colleges found matching your criteria.</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
