-- K22 Students (Senior students with more credits completed)
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 45, 15, 12, 1, 1 
FROM user u WHERE u.username = '2213001' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 42, 14, 11, 1, 2 
FROM user u WHERE u.username = '2213002' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 48, 16, 13, 1, 3 
FROM user u WHERE u.username = '2213003' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 39, 13, 10, 1, 7 
FROM user u WHERE u.username = '2213004' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 51, 17, 14, 1, 6 
FROM user u WHERE u.username = '2213005' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 36, 12, 9, 1, 4 
FROM user u WHERE u.username = '2213006' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 45, 15, 12, 1, 5 
FROM user u WHERE u.username = '2213007' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 33, 11, 8, 1, 1 
FROM user u WHERE u.username = '2213008' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 42, 14, 11, 1, 2 
FROM user u WHERE u.username = '2213009' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 48, 16, 13, 1, 3 
FROM user u WHERE u.username = '2213010' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- K23 Students (Newer intake, fewer credits completed)
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 21, 7, 6, 1, 1 
FROM user u WHERE u.username = '2313001' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 24, 8, 7, 1, 2 
FROM user u WHERE u.username = '2313002' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 18, 6, 5, 1, 6 
FROM user u WHERE u.username = '2313003' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 27, 9, 8, 1, 5 
FROM user u WHERE u.username = '2313004' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 21, 7, 6, 1, 7 
FROM user u WHERE u.username = '2313005' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);