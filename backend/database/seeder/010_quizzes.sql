-- Sample quizzes for courses (using actual section IDs from database)
INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Kiểm tra giữa kỳ - Lập trình cơ bản', 2, 'open', 120, 10.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Bài tập về Hàm', 3, 'open', 60, 5.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Kiểm tra cuối kỳ - Lập trình', 1, 'closed', 180, 15.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Quiz - Cấu trúc dữ liệu', 2, 'open', 90, 8.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Bài tập thuật toán', 3, 'open', 45, 4.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Thi cuối kỳ CTDL', 1, 'in_progress', 150, 12.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Kiểm tra SQL', 2, 'open', 75, 6.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Thiết kế CSDL', 1, 'open', 120, 10.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Quiz mạng cơ bản', 3, 'open', 60, 5.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3015' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO quiz (quiz_name, attempts, state, duration, grade, section_id, teacher_id, course_id)
SELECT 'Thi giữa kỳ MMT', 1, 'closed', 90, 8.0, s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3015' AND s.section_name = 'L01' LIMIT 1;