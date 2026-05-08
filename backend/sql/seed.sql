-- ============================================
-- Sample Data - College Platform
-- ============================================

-- INSERT COLLEGES
INSERT INTO colleges (name, location, state, description, image_url, fees_per_year, rating, placement_percentage, type, established_year, website, accreditation, total_students) VALUES
(
  'Indian Institute of Technology Bombay',
  'Mumbai', 'Maharashtra',
  'IIT Bombay is one of India''s premier engineering institutes, renowned for excellence in technology, science, and research. It consistently ranks among the top engineering colleges in India and Asia. The institute offers a vibrant campus life with numerous clubs, sports facilities, and cultural events.',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
  250000, 4.9, 98, 'Public', 1958,
  'https://www.iitb.ac.in', 'NAAC A++', 10000
),
(
  'Indian Institute of Technology Delhi',
  'New Delhi', 'Delhi',
  'IIT Delhi is a premier engineering institution recognized globally for its research output and academic excellence. Located in the heart of New Delhi, it has strong industry connections and alumni networks across the globe. The institute excels in engineering, management, and applied sciences.',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  220000, 4.8, 97, 'Public', 1961,
  'https://home.iitd.ac.in', 'NAAC A++', 9500
),
(
  'National Institute of Technology Trichy',
  'Tiruchirappalli', 'Tamil Nadu',
  'NIT Trichy is consistently ranked as the top NIT in India. Known for its strong academics, vibrant technical culture, and excellent placement records, it attracts students from across the country. The campus boasts world-class infrastructure and research facilities.',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
  130000, 4.7, 95, 'Public', 1964,
  'https://www.nitt.edu', 'NAAC A++', 6500
),
(
  'BITS Pilani',
  'Pilani', 'Rajasthan',
  'Birla Institute of Technology and Science (BITS) Pilani is one of India''s top private universities. Famous for its dual-degree programs, practice school internships, and strong alumni network in Silicon Valley and top global companies. It offers extensive opportunities in research and innovation.',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80',
  480000, 4.7, 94, 'Deemed', 1964,
  'https://www.bits-pilani.ac.in', 'NAAC A', 14000
),
(
  'Vellore Institute of Technology',
  'Vellore', 'Tamil Nadu',
  'VIT Vellore is a deemed university known for its industry-oriented curriculum and exceptional placement record. With students from 60+ countries, it offers a truly global learning environment. The university has strong tie-ups with leading multinational companies for placements and research.',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
  200000, 4.5, 92, 'Deemed', 1984,
  'https://vit.ac.in', 'NAAC A++', 50000
),
(
  'Delhi Technological University',
  'New Delhi', 'Delhi',
  'DTU (formerly Delhi College of Engineering) is one of the most prestigious state universities in India. Located in North Delhi, it offers excellent engineering programs with strong placement support. Alumni work at leading companies like Google, Microsoft, Amazon, and Goldman Sachs.',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80',
  180000, 4.4, 90, 'Public', 1941,
  'https://dtu.ac.in', 'NAAC A', 12000
),
(
  'Manipal Institute of Technology',
  'Manipal', 'Karnataka',
  'MIT Manipal is part of the prestigious Manipal Academy of Higher Education. It is known for its excellent infrastructure, research facilities, and industry connections. The institute has a strong international presence with collaborations with universities in the US, UK, and Australia.',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  280000, 4.3, 88, 'Private', 1957,
  'https://manipal.edu/mit.html', 'NAAC A+', 18000
),
(
  'SRM Institute of Science and Technology',
  'Chennai', 'Tamil Nadu',
  'SRM is one of the top-ranked private universities in India with a strong focus on engineering and technology. It offers excellent placement support with 500+ recruiting companies. The university has a sprawling campus with modern amenities, labs, and research centers.',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80',
  220000, 4.2, 86, 'Deemed', 1985,
  'https://www.srmist.edu.in', 'NAAC A++', 55000
),
(
  'Thapar Institute of Engineering',
  'Patiala', 'Punjab',
  'Thapar Institute is a leading technical university in Northern India known for its research and industry collaborations. It has strong ties with companies in the IT, automotive, and manufacturing sectors. The institute offers scholarships and financial aid to meritorious students.',
  'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&q=80',
  350000, 4.3, 89, 'Deemed', 1956,
  'https://www.thapar.edu', 'NAAC A', 13000
),
(
  'Amity University',
  'Noida', 'Uttar Pradesh',
  'Amity University is one of India''s largest private universities offering a wide range of programs across disciplines. Known for its modern infrastructure, international collaborations, and strong placement cell. The university has campuses across India and international locations.',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
  300000, 4.0, 82, 'Private', 2005,
  'https://www.amity.edu', 'NAAC A+', 80000
),
(
  'Jadavpur University',
  'Kolkata', 'West Bengal',
  'Jadavpur University is a premier public university in Eastern India, known for its strong engineering and arts programs. It consistently ranks among the top 10 engineering colleges in India. The university has a rich tradition of student activism and academic freedom.',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  45000, 4.6, 93, 'Public', 1955,
  'https://jadavpuruniversity.in', 'NAAC A++', 8000
),
(
  'PSG College of Technology',
  'Coimbatore', 'Tamil Nadu',
  'PSG College of Technology is one of the finest autonomous engineering colleges in South India. It has state-of-the-art labs, strong industry-academia partnerships, and an excellent track record of placements. The college is affiliated with Anna University.',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
  95000, 4.4, 91, 'Private', 1951,
  'https://www.psgtech.edu', 'NAAC A++', 7000
);

-- INSERT COURSES
-- IIT Bombay (id=1)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(1, 'B.Tech Computer Science', '4 Years', 250000),
(1, 'B.Tech Electrical Engineering', '4 Years', 250000),
(1, 'B.Tech Mechanical Engineering', '4 Years', 250000),
(1, 'M.Tech Computer Science', '2 Years', 120000),
(1, 'MBA', '2 Years', 300000),
(1, 'PhD Programs', '4-5 Years', 50000);

-- IIT Delhi (id=2)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(2, 'B.Tech Computer Science', '4 Years', 220000),
(2, 'B.Tech Electronics', '4 Years', 220000),
(2, 'B.Tech Chemical Engineering', '4 Years', 220000),
(2, 'M.Tech AI & ML', '2 Years', 110000),
(2, 'MBA', '2 Years', 280000);

-- NIT Trichy (id=3)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(3, 'B.Tech Computer Science', '4 Years', 130000),
(3, 'B.Tech Civil Engineering', '4 Years', 130000),
(3, 'B.Tech Electronics', '4 Years', 130000),
(3, 'M.Tech Production Engineering', '2 Years', 80000);

-- BITS Pilani (id=4)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(4, 'B.E. Computer Science', '4 Years', 480000),
(4, 'B.E. Electrical & Electronics', '4 Years', 480000),
(4, 'M.Sc. Economics', '2 Years', 200000),
(4, 'M.E. Software Systems', '2 Years', 250000);

-- VIT (id=5)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(5, 'B.Tech Computer Science', '4 Years', 200000),
(5, 'B.Tech IT', '4 Years', 200000),
(5, 'B.Tech Mechanical Engineering', '4 Years', 190000),
(5, 'MBA', '2 Years', 250000),
(5, 'M.Tech Data Science', '2 Years', 180000);

-- DTU (id=6)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(6, 'B.Tech Computer Science', '4 Years', 180000),
(6, 'B.Tech Software Engineering', '4 Years', 180000),
(6, 'B.Tech Civil Engineering', '4 Years', 180000),
(6, 'M.Tech Electronics', '2 Years', 90000);

-- MIT Manipal (id=7)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(7, 'B.Tech Computer Science', '4 Years', 280000),
(7, 'B.Tech Mechatronics', '4 Years', 280000),
(7, 'B.Tech Civil Engineering', '4 Years', 260000),
(7, 'MBA', '2 Years', 320000);

-- SRM (id=8)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(8, 'B.Tech Computer Science', '4 Years', 220000),
(8, 'B.Tech Biotechnology', '4 Years', 200000),
(8, 'B.Tech AI & ML', '4 Years', 250000),
(8, 'MBA', '2 Years', 200000);

-- Thapar (id=9)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(9, 'B.E. Computer Engineering', '4 Years', 350000),
(9, 'B.E. Electronics', '4 Years', 350000),
(9, 'MBA', '2 Years', 400000);

-- Amity (id=10)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(10, 'B.Tech Computer Science', '4 Years', 300000),
(10, 'B.Tech IT', '4 Years', 280000),
(10, 'BBA', '3 Years', 200000),
(10, 'MBA', '2 Years', 350000),
(10, 'B.Sc. Psychology', '3 Years', 180000);

-- Jadavpur (id=11)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(11, 'B.E. Computer Science', '4 Years', 45000),
(11, 'B.E. Electronics', '4 Years', 45000),
(11, 'B.E. Chemical Engineering', '4 Years', 45000),
(11, 'M.E. Power Systems', '2 Years', 30000);

-- PSG (id=12)
INSERT INTO college_courses (college_id, course, duration, fees) VALUES
(12, 'B.E. Computer Science', '4 Years', 95000),
(12, 'B.E. Electronics', '4 Years', 95000),
(12, 'B.E. Mechanical', '4 Years', 90000),
(12, 'M.E. CAD/CAM', '2 Years', 70000);

SELECT 'Sample data inserted successfully!' as status;
