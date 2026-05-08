# College Discovery Platform

A full-stack web application for discovering, comparing, and saving colleges. Built with React, Node.js, Express, and PostgreSQL.

## Features Built
1. **College Listing & Search**: Browse colleges, filter by location and fees, sort by ratings and placements.
2. **College Detail Page**: View comprehensive information about a college, its courses, fees, placements, and reviews.
3. **Compare Colleges**: Side-by-side comparison of up to 3 colleges.
4. **Authentication**: JWT-based login and registration.
5. **Saved Colleges**: Authenticated users can save their favorite colleges.

## Technology Stack
- **Frontend**: React.js, React Router DOM, Vanilla CSS, Vite, Axios, Lucide React (Icons).
- **Backend**: Node.js, Express.js, PostgreSQL (pg), JWT, bcryptjs.

## Local Setup Instructions

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### 1. Database Setup
1. Create a PostgreSQL database named `college_platform`:
   ```sql
   CREATE DATABASE college_platform;
   ```
2. Run the schema creation script:
   ```bash
   psql -U postgres -d college_platform -f backend/sql/schema.sql
   ```
3. Run the sample data insertion script:
   ```bash
   psql -U postgres -d college_platform -f backend/sql/seed.sql
   ```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file with your PostgreSQL password:
   ```env
   DB_PASSWORD=your_postgres_password
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Implementation Workflow

1. **Database Design**: Designed relational tables for Users, Colleges, Courses, Reviews, and Saved Colleges.
2. **Backend Architecture**: Set up Express.js with a structured MVC-like pattern (Routes, Controllers, Middleware).
3. **API Development**: Created robust RESTful APIs with global error handling and JWT-based protection for specific routes.
4. **Frontend Foundation**: Set up React with Vite, configured global CSS variables for a modern, consistent, and responsive design system.
5. **State Management**: Created a React Context (`AuthContext`) to manage the user's authentication state globally.
6. **UI Component Development**: Built reusable UI elements (Navbar, Footer, Buttons, Cards) adhering to modern aesthetics (shadows, transitions, gradients).
7. **Page Integration**: Developed the individual pages (Home, Details, Compare, Auth, Saved) and connected them to the backend using Axios.

## Deployment Steps

### Backend Deployment (e.g., Render, Railway)
1. Provision a managed PostgreSQL database.
2. Run the `schema.sql` and `seed.sql` on the managed database.
3. Deploy the Node.js application.
4. Set environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `FRONTEND_URL`) on the hosting provider.
5. Set the Start Command to `npm start` (which runs `node src/app.js`).

### Frontend Deployment (e.g., Vercel, Netlify)
1. Connect the frontend repository to Vercel/Netlify.
2. Set the Environment Variable `VITE_API_URL` to point to the deployed Backend URL.
3. Set the build command to `npm run build` and publish directory to `dist`.
4. Deploy the application.
