-- Sample enrollment data for K22 students
INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1013', s.student_id, '2024-09-01', '2024-12-15', 8.5, 100
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213001';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1013', s.student_id, '2024-09-01', '2024-12-15', 7.8, 100
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213002';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1013', s.student_id, '2024-09-01', NULL, 6.2, 85
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213003';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1013', s.student_id, '2024-09-01', NULL, 5.5, 75
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213004';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1013', s.student_id, '2024-09-01', '2024-12-15', 9.2, 100
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213005';

-- CO1014 enrollments
INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1014', s.student_id, '2024-09-01', NULL, 7.5, 90
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213001';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1014', s.student_id, '2024-09-01', '2024-12-15', 8.8, 100
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213002';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1014', s.student_id, '2024-09-01', NULL, 6.0, 70
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213006';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1014', s.student_id, '2024-09-01', '2024-12-15', 8.2, 100
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213007';

-- MI1013 enrollments
INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'MI1013', s.student_id, '2024-09-01', NULL, 7.0, 80
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213003';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'MI1013', s.student_id, '2024-09-01', NULL, 6.5, 75
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213004';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'MI1013', s.student_id, '2024-09-01', '2024-12-15', 8.7, 100
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213008';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'MI1013', s.student_id, '2024-09-01', NULL, 7.3, 85
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213009';

-- CO2013 enrollments  
INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO2013', s.student_id, '2024-09-01', '2024-12-15', 9.0, 100
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213005';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO2013', s.student_id, '2024-09-01', NULL, 6.8, 82
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2213010';

-- Recent enrollments for K23 students
INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1013', s.student_id, '2025-01-15', NULL, NULL, 45
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2313001';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1013', s.student_id, '2025-01-15', NULL, NULL, 50
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2313002';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1014', s.student_id, '2025-01-15', NULL, NULL, 40
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2313003';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'CO1014', s.student_id, '2025-01-15', NULL, NULL, 55
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2313004';

INSERT IGNORE INTO enroll (course_id, student_id, start_date, complete_date, grade, progress)
SELECT 'MI1013', s.student_id, '2025-01-15', NULL, NULL, 35
FROM student s JOIN user u ON s.user_id = u.user_id WHERE u.username = '2313005'