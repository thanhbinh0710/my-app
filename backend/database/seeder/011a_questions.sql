-- =============================================
-- Sample Questions for Quizzes
-- =============================================

-- Questions for Variables and Data Types Quiz (CO1013 Section 2)
INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'Which of the following is NOT a primitive data type in C?',
    'multiple_choice',
    'string',
    '["int", "float", "char"]',
    q.quiz_id,
    s.section_id,
    'CO1013',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'Variables and Data Types Quiz' AND u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'What is the size of int data type in C (typically)?',
    'multiple_choice',
    '4 bytes',
    '["1 byte", "2 bytes", "8 bytes"]',
    q.quiz_id,
    s.section_id,
    'CO1013',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'Variables and Data Types Quiz' AND u.username = 'nvan.an' LIMIT 1;

-- Questions for Arrays, Stacks, and Queues Quiz (CO2013 Section 2)
INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'What is the time complexity of accessing an element in an array by index?',
    'multiple_choice',
    'O(1)',
    '["O(n)", "O(log n)", "O(n^2)"]',
    q.quiz_id,
    s.section_id,
    'CO2013',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'Arrays, Stacks, and Queues Quiz' AND u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'Which data structure follows LIFO (Last In First Out) principle?',
    'multiple_choice',
    'Stack',
    '["Queue", "Array", "Linked List"]',
    q.quiz_id,
    s.section_id,
    'CO2013',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'Arrays, Stacks, and Queues Quiz' AND u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'In a queue, where are elements added and removed from?',
    'multiple_choice',
    'Added at rear, removed from front',
    '["Added at front, removed from rear", "Both from front", "Both from rear"]',
    q.quiz_id,
    s.section_id,
    'CO2013',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'Arrays, Stacks, and Queues Quiz' AND u.username = 'nvan.an' LIMIT 1;

-- Questions for SQL Queries Quiz (CO3013 Section 2)
INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'Which SQL clause is used to filter records?',
    'multiple_choice',
    'WHERE',
    '["SELECT", "FROM", "GROUP BY"]',
    q.quiz_id,
    s.section_id,
    'CO3013',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'SQL Queries Quiz' AND u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'Which JOIN returns all records from both tables?',
    'multiple_choice',
    'FULL OUTER JOIN',
    '["INNER JOIN", "LEFT JOIN", "RIGHT JOIN"]',
    q.quiz_id,
    s.section_id,
    'CO3013',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'SQL Queries Quiz' AND u.username = 'lvan.cuong' LIMIT 1;

-- Questions for Classes and Objects Quiz (CO2014 Section 1)
INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'What is a class in OOP?',
    'multiple_choice',
    'A blueprint for creating objects',
    '["An instance of an object", "A function", "A variable"]',
    q.quiz_id,
    s.section_id,
    'CO2014',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'Classes and Objects Quiz' AND u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, course_id, teacher_id)
SELECT 
    'Which keyword is used to create a new instance of a class?',
    'multiple_choice',
    'new',
    '["create", "instance", "make"]',
    q.quiz_id,
    s.section_id,
    'CO2014',
    t.teacher_id
FROM quiz q
JOIN section s ON q.section_id = s.section_id
JOIN teacher t ON s.teacher_id = t.teacher_id
JOIN user u ON t.user_id = u.user_id
WHERE q.quiz_name = 'Classes and Objects Quiz' AND u.username = 'tthi.binh' LIMIT 1;
