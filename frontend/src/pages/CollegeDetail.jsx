import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MapPin, Star, IndianRupee, Globe, Phone, Mail, Award, Users, Heart, Share2, Check } from 'lucide-react';
import { collegeAPI, savedAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';
import './CollegeDetail.css';

const CollegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCollegeData();
    if (user) {
      checkSavedStatus();
    }
  }, [id, user]);

  const fetchCollegeData = async () => {
    try {
      const { data } = await collegeAPI.getById(id);
      setCollege(data.college);
    } catch (error) {
      toast.error('Failed to load college details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const checkSavedStatus = async () => {
    try {
      const { data } = await savedAPI.check(id);
      setIsSaved(data.isSaved);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveToggle = async () => {
    if (!user) {
      toast.error('Please login to save colleges');
      navigate('/login');
      return;
    }

    try {
      if (isSaved) {
        await savedAPI.unsave(id);
        toast.success('Removed from saved list');
      } else {
        await savedAPI.save(id);
        toast.success('Added to saved list');
      }
      setIsSaved(!isSaved);
    } catch (error) {
      toast.error('Action failed');
    }
  };

  const handleCompareAdd = () => {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (compareList.length >= 3) {
      toast.error('You can only compare up to 3 colleges');
      return;
    }
    if (!compareList.includes(parseInt(id))) {
      compareList.push(parseInt(id));
      localStorage.setItem('compareList', JSON.stringify(compareList));
      toast.success('Added to compare list');
    } else {
      toast.error('Already in compare list');
    }
  };

  if (loading) return <div className="loader"></div>;
  if (!college) return null;

  return (
    <div className="college-detail">
      {/* Header Banner */}
      <div className="detail-banner">
        <img src={college.image_url} alt={college.name} className="banner-img" />
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <div className="banner-header">
            <span className="badge badge-primary">{college.type}</span>
            <span className="badge badge-success"><Award size={14} className="mr-1"/> {college.accreditation}</span>
          </div>
          <h1 className="detail-title">{college.name}</h1>
          <div className="detail-meta">
            <span><MapPin size={18}/> {college.location}, {college.state}</span>
            <span><Star size={18} className="text-warning"/> {college.rating} Rating</span>
            <span><Users size={18}/> {college.total_students?.toLocaleString() || 'N/A'} Students</span>
            <span>Est. {college.established_year}</span>
          </div>
          
          <div className="detail-actions">
            <button 
              className={`btn ${isSaved ? 'btn-primary' : 'btn-outline-light'}`}
              onClick={handleSaveToggle}
            >
              <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? 'Saved' : 'Save College'}
            </button>
            <button className="btn btn-outline-light" onClick={handleCompareAdd}>
              <Share2 size={18} /> Add to Compare
            </button>
          </div>
        </div>
      </div>

      <div className="container detail-body">
        <div className="detail-sidebar">
          <div className="card quick-info-card">
            <h3>Quick Information</h3>
            <ul className="info-list">
              <li>
                <div className="info-label"><IndianRupee size={16}/> Avg Fees</div>
                <div className="info-value">₹{college.fees_per_year.toLocaleString()} / year</div>
              </li>
              <li>
                <div className="info-label"><Award size={16}/> Placement</div>
                <div className="info-value">{college.placement_percentage}% Placed</div>
              </li>
              {college.website && (
                <li>
                  <div className="info-label"><Globe size={16}/> Website</div>
                  <div className="info-value"><a href={college.website} target="_blank" rel="noreferrer" style={{color: 'var(--primary-color)'}}>Visit Site</a></div>
                </li>
              )}
              {college.phone && (
                <li>
                  <div className="info-label"><Phone size={16}/> Phone</div>
                  <div className="info-value">{college.phone}</div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="detail-main">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses & Fees
            </button>
            <button 
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-section animate-fade-in">
                <h2>About {college.name}</h2>
                <p className="college-description">{college.description}</p>
                
                <h3 className="mt-8">Highlights</h3>
                <div className="highlights-grid">
                  <div className="highlight-item">
                    <Check size={20} color="var(--success-color)"/>
                    <div>
                      <h4>Top Tier Placements</h4>
                      <p>{college.placement_percentage}% placement record with top MNCs</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <Check size={20} color="var(--success-color)"/>
                    <div>
                      <h4>Recognized Accreditation</h4>
                      <p>Accredited with {college.accreditation} grade</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <Check size={20} color="var(--success-color)"/>
                    <div>
                      <h4>Expert Faculty</h4>
                      <p>Learn from industry experts and researchers</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="courses-section animate-fade-in">
                <h2>Available Courses</h2>
                <div className="courses-list">
                  {college.courses?.map((course, idx) => (
                    <div key={idx} className="course-item card">
                      <div className="course-header">
                        <h3>{course.course}</h3>
                        <span className="course-duration">{course.duration}</span>
                      </div>
                      <div className="course-fees">
                        <IndianRupee size={16} /> {course.fees?.toLocaleString()} / year
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-section animate-fade-in">
                <h2>Student Reviews</h2>
                {college.reviews?.length > 0 ? (
                  <div className="reviews-list">
                    {college.reviews.map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <div className="avatar">{review.user_name.charAt(0)}</div>
                            <div>
                              <h4>{review.user_name}</h4>
                              <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="review-rating">
                            <Star size={16} fill="currentColor" color="var(--warning-color)"/>
                            {review.rating}/5
                          </div>
                        </div>
                        <p className="review-text">{review.review_text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-reviews">No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
