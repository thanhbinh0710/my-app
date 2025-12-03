-- =============================================
-- Sections for Courses
-- Each course has multiple sections/modules
-- =============================================

-- CO1013 - Intro to Programming (3 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Introduction to Programming Concepts', 'CO1013', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Variables and Data Types', 'CO1013', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Control Structures', 'CO1013', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

-- CO1014 - Programming Techniques (4 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Functions and Modularity', 'CO1014', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Arrays and Strings', 'CO1014', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Pointers and Memory Management', 'CO1014', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'File I/O and Data Persistence', 'CO1014', t.teacher_id, 4
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

-- CO2013 - Data Structures & Algorithms (5 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Introduction to Data Structures', 'CO2013', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Linear Data Structures: Lists, Stacks, Queues', 'CO2013', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Trees and Binary Search Trees', 'CO2013', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Graphs and Graph Algorithms', 'CO2013', t.teacher_id, 4
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Sorting and Searching Algorithms', 'CO2013', t.teacher_id, 5
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

-- CO2014 - Object-Oriented Programming (4 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'OOP Fundamentals: Classes and Objects', 'CO2014', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Inheritance and Polymorphism', 'CO2014', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Encapsulation and Abstraction', 'CO2014', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Design Patterns and Best Practices', 'CO2014', t.teacher_id, 4
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

-- CO3013 - Database Systems (5 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Introduction to Database Management Systems', 'CO3013', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Relational Model and SQL', 'CO3013', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Database Design and Normalization', 'CO3013', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Transactions and Concurrency Control', 'CO3013', t.teacher_id, 4
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Advanced Topics: Indexes and Query Optimization', 'CO3013', t.teacher_id, 5
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

-- CO3014 - Operating Systems (5 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Introduction to Operating Systems', 'CO3014', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'pthi.dung' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Process Management and Scheduling', 'CO3014', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'pthi.dung' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Memory Management', 'CO3014', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'pthi.dung' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'File Systems and Storage', 'CO3014', t.teacher_id, 4
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'pthi.dung' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Synchronization and Deadlocks', 'CO3014', t.teacher_id, 5
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'pthi.dung' LIMIT 1;

-- CO3015 - Computer Networks (4 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Network Fundamentals and OSI Model', 'CO3015', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'bvan.nam' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Data Link Layer and Network Layer', 'CO3015', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'bvan.nam' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Transport Layer: TCP/UDP', 'CO3015', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'bvan.nam' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Application Layer and Network Security', 'CO3015', t.teacher_id, 4
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'bvan.nam' LIMIT 1;

-- CO4013 - Artificial Intelligence (5 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Introduction to AI and Intelligent Agents', 'CO4013', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'vminh.duc' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Search Algorithms and Problem Solving', 'CO4013', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'vminh.duc' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Knowledge Representation and Reasoning', 'CO4013', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'vminh.duc' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Machine Learning Basics', 'CO4013', t.teacher_id, 4
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'vminh.duc' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Neural Networks and Deep Learning Intro', 'CO4013', t.teacher_id, 5
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'vminh.duc' LIMIT 1;

-- CO4017 - Web Development (4 sections)
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'HTML, CSS and JavaScript Fundamentals', 'CO4017', t.teacher_id, 1
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Frontend Frameworks: React/Vue', 'CO4017', t.teacher_id, 2
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Backend Development with Node.js/Express', 'CO4017', t.teacher_id, 3
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'Full-Stack Integration and Deployment', 'CO4017', t.teacher_id, 4
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;
