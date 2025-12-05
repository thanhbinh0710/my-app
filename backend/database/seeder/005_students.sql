-- K22 Students (Dữ liệu khớp với enrollments thực tế)
-- 2213001: 2 courses (CO1013 completed grade 8.5, CO1014 in-progress grade 7.5) = 8 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 8, 2, 1, 1, 1 
FROM user u WHERE u.username = '2213001' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213002: 2 courses (CO1013 completed grade 7.8, CO1014 completed grade 8.8) = 8 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 8, 2, 2, 1, 2 
FROM user u WHERE u.username = '2213002' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213003: 2 courses (CO1013 in-progress grade 6.2, MI1013 in-progress grade 7.0) = 8 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 8, 2, 0, 1, 3 
FROM user u WHERE u.username = '2213003' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213004: 2 courses (CO1013 in-progress grade 5.5, MI1013 in-progress grade 6.5) = 8 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 8, 2, 0, 1, 7 
FROM user u WHERE u.username = '2213004' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213005: 2 courses (CO1013 completed grade 9.2, CO2013 completed grade 9.0) = 8 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 8, 2, 2, 1, 6 
FROM user u WHERE u.username = '2213005' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213006: 1 course (CO1014 in-progress grade 6.0) = 4 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 4, 1, 0, 1, 4 
FROM user u WHERE u.username = '2213006' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213007: 1 course (CO1014 completed grade 8.2) = 4 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 4, 1, 1, 1, 5 
FROM user u WHERE u.username = '2213007' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213008: 1 course (MI1013 completed grade 8.7) = 4 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 4, 1, 1, 1, 1 
FROM user u WHERE u.username = '2213008' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213009: 1 course (MI1013 in-progress grade 7.3) = 4 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 4, 1, 0, 1, 2 
FROM user u WHERE u.username = '2213009' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2213010: 1 course (CO2013 in-progress grade 6.8) = 4 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2022-09-01', 4, 1, 0, 1, 3 
FROM user u WHERE u.username = '2213010' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- K23 Students (Sinh viên năm 1, ít tín chỉ hơn, khớp với enrollments)
-- 2313001: 1 course (CO1013 in-progress, no grade yet) = 0 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 0, 1, 0, 1, 1 
FROM user u WHERE u.username = '2313001' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2313002: 1 course (CO1013 in-progress, no grade yet) = 0 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 0, 1, 0, 1, 2 
FROM user u WHERE u.username = '2313002' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2313003: 1 course (CO1014 in-progress, no grade yet) = 0 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 0, 1, 0, 1, 6 
FROM user u WHERE u.username = '2313003' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2313004: 1 course (CO1014 in-progress, no grade yet) = 0 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 0, 1, 0, 1, 5 
FROM user u WHERE u.username = '2313004' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);

-- 2313005: 1 course (MI1013 in-progress, no grade yet) = 0 credits earned
INSERT IGNORE INTO student (user_id, admission_date, total_credit_earn, total_course_register, total_course_complete, faculty_id, roadmap_id)
SELECT u.user_id, '2023-09-01', 0, 1, 0, 1, 7 
FROM user u WHERE u.username = '2313005' AND NOT EXISTS (SELECT 1 FROM student s WHERE s.user_id = u.user_id);