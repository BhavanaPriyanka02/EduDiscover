import API from './axios';

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
};

export const collegeAPI = {
  getAll: (params) => API.get('/colleges', { params }),
  getById: (id) => API.get(`/colleges/${id}`),
  compare: (ids) => API.get('/colleges/compare', { params: { ids: ids.join(',') } }),
  getLocations: () => API.get('/colleges/locations'),
};

export const savedAPI = {
  getAll: () => API.get('/saved'),
  save: (collegeId) => API.post(`/saved/${collegeId}`),
  unsave: (collegeId) => API.delete(`/saved/${collegeId}`),
  check: (collegeId) => API.get(`/saved/check/${collegeId}`),
};
