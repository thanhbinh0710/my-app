-- =============================================
-- Quizzes for Course Sections
-- =============================================

-- Quiz for CO1013 Section 2 (Variables and Data Types)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Variables and Data Types Quiz', 2, 'open', 30, s.section_id, 'CO1013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_order = 2 AND u.username = 'nvan.an' LIMIT 1;

-- Quiz for CO1013 Section 3 (Control Structures)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Control Structures Assessment', 2, 'open', 45, s.section_id, 'CO1013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_order = 3 AND u.username = 'nvan.an' LIMIT 1;

-- Quiz for CO2013 Section 2 (Linear Data Structures)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Arrays, Stacks, and Queues Quiz', 3, 'open', 60, s.section_id, 'CO2013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2013' AND s.section_order = 2 AND u.username = 'nvan.an' LIMIT 1;

-- Quiz for CO2013 Section 3 (Trees)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Binary Trees and BST Quiz', 2, 'open', 50, s.section_id, 'CO2013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2013' AND s.section_order = 3 AND u.username = 'nvan.an' LIMIT 1;

-- Quiz for CO2013 Section 5 (Sorting and Searching)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Sorting Algorithms Quiz', 2, 'open', 45, s.section_id, 'CO2013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2013' AND s.section_order = 5 AND u.username = 'nvan.an' LIMIT 1;

-- Quiz for CO2014 Section 1 (OOP Fundamentals)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Classes and Objects Quiz', 2, 'open', 40, s.section_id, 'CO2014', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2014' AND s.section_order = 1 AND u.username = 'tthi.binh' LIMIT 1;

-- Quiz for CO2014 Section 2 (Inheritance and Polymorphism)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Inheritance and Polymorphism Quiz', 2, 'open', 50, s.section_id, 'CO2014', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2014' AND s.section_order = 2 AND u.username = 'tthi.binh' LIMIT 1;

-- Quiz for CO3013 Section 2 (SQL)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'SQL Queries Quiz', 3, 'open', 60, s.section_id, 'CO3013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO3013' AND s.section_order = 2 AND u.username = 'lvan.cuong' LIMIT 1;

-- Quiz for CO3013 Section 3 (Database Design)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Normalization Quiz', 2, 'open', 45, s.section_id, 'CO3013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO3013' AND s.section_order = 3 AND u.username = 'lvan.cuong' LIMIT 1;

-- Quiz for CO3014 Section 2 (Process Management)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Process Scheduling Quiz', 2, 'open', 50, s.section_id, 'CO3014', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO3014' AND s.section_order = 2 AND u.username = 'pthi.dung' LIMIT 1;

-- Quiz for CO3015 Section 1 (Network Fundamentals)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'OSI Model Quiz', 2, 'open', 30, s.section_id, 'CO3015', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO3015' AND s.section_order = 1 AND u.username = 'bvan.nam' LIMIT 1;

-- Quiz for CO4017 Section 2 (Frontend Frameworks)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'React Fundamentals Quiz', 2, 'open', 45, s.section_id, 'CO4017', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO4017' AND s.section_order = 2 AND u.username = 'lvan.cuong' LIMIT 1;

-- Quiz for CO4017 Section 3 (Backend Development)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, section_id, course_id, teacher_id)
SELECT 'Node.js and Express Quiz', 2, 'open', 50, s.section_id, 'CO4017', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO4017' AND s.section_order = 3 AND u.username = 'lvan.cuong' LIMIT 1;
