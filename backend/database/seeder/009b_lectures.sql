-- =============================================
-- Lectures for Course Sections
-- =============================================

-- Lectures for CO1013 Section 1 (Intro to Programming Concepts)
INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'What is Programming?', 'Introduction to programming, algorithms, and computational thinking', 'published', 
'https://docs.example.com/intro-programming', s.section_id, 'CO1013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_order = 1 AND u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Programming Languages Overview', 'Compiled vs Interpreted languages, syntax basics', 'published',
'https://docs.example.com/languages-overview', s.section_id, 'CO1013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_order = 1 AND u.username = 'nvan.an' LIMIT 1;

-- Lectures for CO1013 Section 2 (Variables and Data Types)
INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Variables and Constants', 'Declaring variables, naming conventions, scope', 'published',
'https://docs.example.com/variables', s.section_id, 'CO1013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_order = 2 AND u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Primitive Data Types', 'int, float, char, boolean - understanding data types', 'published',
'https://docs.example.com/data-types', s.section_id, 'CO1013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_order = 2 AND u.username = 'nvan.an' LIMIT 1;

-- Lectures for CO2013 Section 1 (Intro to Data Structures)
INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'What are Data Structures?', 'Introduction to data structures, Abstract Data Types', 'published',
'https://docs.example.com/ds-intro', s.section_id, 'CO2013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2013' AND s.section_order = 1 AND u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Time and Space Complexity', 'Big O Notation, analyzing algorithms', 'published',
'https://docs.example.com/complexity', s.section_id, 'CO2013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2013' AND s.section_order = 1 AND u.username = 'nvan.an' LIMIT 1;

-- Lectures for CO2013 Section 2 (Linear Data Structures)
INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Arrays and Dynamic Arrays', 'Array implementation, operations, complexity', 'published',
'https://docs.example.com/arrays', s.section_id, 'CO2013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2013' AND s.section_order = 2 AND u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Linked Lists', 'Singly and Doubly linked lists, operations', 'published',
'https://docs.example.com/linked-lists', s.section_id, 'CO2013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2013' AND s.section_order = 2 AND u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Stacks and Queues', 'LIFO and FIFO data structures, applications', 'published',
'https://docs.example.com/stacks-queues', s.section_id, 'CO2013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO2013' AND s.section_order = 2 AND u.username = 'nvan.an' LIMIT 1;

-- Lectures for CO3013 Section 2 (SQL)
INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'SQL Basics: SELECT, FROM, WHERE', 'Basic SQL queries, filtering data', 'published',
'https://docs.example.com/sql-basics', s.section_id, 'CO3013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO3013' AND s.section_order = 2 AND u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'SQL Joins', 'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN', 'published',
'https://docs.example.com/sql-joins', s.section_id, 'CO3013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO3013' AND s.section_order = 2 AND u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Aggregate Functions and GROUP BY', 'COUNT, SUM, AVG, MAX, MIN, GROUP BY, HAVING', 'published',
'https://docs.example.com/sql-aggregate', s.section_id, 'CO3013', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO3013' AND s.section_order = 2 AND u.username = 'lvan.cuong' LIMIT 1;

-- Lectures for CO4017 Section 2 (Frontend Frameworks)
INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'Introduction to React', 'React fundamentals, components, JSX', 'published',
'https://docs.example.com/react-intro', s.section_id, 'CO4017', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO4017' AND s.section_order = 2 AND u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'React Hooks', 'useState, useEffect, useContext, custom hooks', 'published',
'https://docs.example.com/react-hooks', s.section_id, 'CO4017', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO4017' AND s.section_order = 2 AND u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, course_id, teacher_id)
SELECT 'State Management with Redux', 'Redux basics, actions, reducers, store', 'published',
'https://docs.example.com/redux', s.section_id, 'CO4017', t.teacher_id
FROM section s 
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE s.course_id = 'CO4017' AND s.section_order = 2 AND u.username = 'lvan.cuong' LIMIT 1;
