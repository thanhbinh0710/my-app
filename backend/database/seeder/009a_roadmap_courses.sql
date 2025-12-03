-- =============================================
-- Roadmap-Course Mapping (contain table)
-- Maps courses to their respective roadmaps
-- =============================================

-- Computer Science Roadmap (roadmap_id = 1) - Full CS curriculum
INSERT IGNORE INTO contain (course_id, roadmap_id, `order`) VALUES
-- Year 1-2: Foundation
('CO1013', 1, 1),  -- Intro to Programming
('CO1014', 1, 2),  -- Programming Techniques
('MI1013', 1, 3),  -- Discrete Mathematics
('CO2013', 1, 4),  -- Data Structures & Algorithms
('CO2014', 1, 5),  -- Object-Oriented Programming

-- Year 2-3: Core
('CO3013', 1, 6),  -- Database Systems
('CO3014', 1, 7),  -- Operating Systems
('CO3015', 1, 8),  -- Computer Networks
('CO3017', 1, 9),  -- Computer Architecture

-- Year 3-4: Advanced
('CO4013', 1, 10), -- Artificial Intelligence
('CO4021', 1, 11), -- Algorithm Design & Analysis
('CO4999', 1, 12); -- Graduation Project

-- Software Engineering Roadmap (roadmap_id = 2)
INSERT IGNORE INTO contain (course_id, roadmap_id, `order`) VALUES
-- Foundation
('CO1013', 2, 1),
('CO1014', 2, 2),
('MI1013', 2, 3),
('CO2013', 2, 4),
('CO2014', 2, 5),

-- Core SE
('CO3013', 2, 6),  -- Database
('CO3016', 2, 7),  -- Software Engineering
('CO3014', 2, 8),  -- OS

-- Advanced SE
('CO4017', 2, 9),  -- Web Development
('CO4018', 2, 10), -- Mobile Development
('CO4999', 2, 11);

-- Information Systems Roadmap (roadmap_id = 3)
INSERT IGNORE INTO contain (course_id, roadmap_id, `order`) VALUES
('CO1013', 3, 1),
('CO1014', 3, 2),
('MI1013', 3, 3),
('CO2013', 3, 4),
('CO2014', 3, 5),
('CO3013', 3, 6),  -- Database (core for IS)
('CO3016', 3, 7),  -- Software Engineering
('CO3015', 3, 8),  -- Networks
('CO4017', 3, 9),  -- Web Development
('CO4999', 3, 10);

-- Network Engineering Roadmap (roadmap_id = 4)
INSERT IGNORE INTO contain (course_id, roadmap_id, `order`) VALUES
('CO1013', 4, 1),
('CO1014', 4, 2),
('MI1013', 4, 3),
('CO2013', 4, 4),
('CO3015', 4, 5),  -- Networks (core)
('CO3014', 4, 6),  -- OS
('CO3017', 4, 7),  -- Computer Architecture
('CO4020', 4, 8),  -- Distributed Systems
('CO4016', 4, 9),  -- Security
('CO4999', 4, 10);

-- Data Science Roadmap (roadmap_id = 5)
INSERT IGNORE INTO contain (course_id, roadmap_id, `order`) VALUES
('CO1013', 5, 1),
('CO1014', 5, 2),
('MI1013', 5, 3),
('CO2013', 5, 4),
('CO2014', 5, 5),
('CO3013', 5, 6),  -- Database
('CO4014', 5, 7),  -- Machine Learning
('CO4015', 5, 8),  -- Data Science
('CO4019', 5, 9),  -- Image Processing
('CO4999', 5, 10);

-- Artificial Intelligence Roadmap (roadmap_id = 6)
INSERT IGNORE INTO contain (course_id, roadmap_id, `order`) VALUES
('CO1013', 6, 1),
('CO1014', 6, 2),
('MI1013', 6, 3),
('CO2013', 6, 4),
('CO2014', 6, 5),
('CO4013', 6, 6),  -- AI
('CO4014', 6, 7),  -- Machine Learning
('CO4015', 6, 8),  -- Data Science
('CO4019', 6, 9),  -- Image Processing
('CO4021', 6, 10), -- Algorithm Design
('CO4999', 6, 11);

-- Information Security Roadmap (roadmap_id = 7)
INSERT IGNORE INTO contain (course_id, roadmap_id, `order`) VALUES
('CO1013', 7, 1),
('CO1014', 7, 2),
('MI1013', 7, 3),
('CO2013', 7, 4),
('CO3015', 7, 5),  -- Networks
('CO3014', 7, 6),  -- OS
('CO4016', 7, 7),  -- Security (core)
('CO4020', 7, 8),  -- Distributed Systems
('CO4021', 7, 9),  -- Algorithms
('CO4999', 7, 10);
