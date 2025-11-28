-- ============================================
-- Views for Common Queries
-- ============================================

-- View for student course progress
CREATE OR REPLACE VIEW v_student_progress AS
SELECT 
    s.student_id,
    u.full_name AS student_name,
    c.course_id,
    c.course_name,
    e.grade,
    e.progress,
    e.start_date,
    e.complete_date
FROM student s
JOIN user u ON s.user_id = u.user_id
JOIN enroll e ON s.student_id = e.student_id
JOIN course c ON e.course_id = c.course_id;

-- View for teacher courses
CREATE OR REPLACE VIEW v_teacher_courses AS
SELECT 
    t.teacher_id,
    u.full_name AS teacher_name,
    c.course_id,
    c.course_name,
    c.course_credit,
    COUNT(DISTINCT e.student_id) AS enrolled_students
FROM teacher t
JOIN user u ON t.user_id = u.user_id
JOIN course c ON t.teacher_id = c.teacher_id
LEFT JOIN enroll e ON c.course_id = e.course_id
GROUP BY t.teacher_id, u.full_name, c.course_id, c.course_name, c.course_credit;

-- View for quiz results
CREATE OR REPLACE VIEW v_quiz_results AS
SELECT 
    q.quiz_id,
    q.quiz_name,
    s.student_id,
    u.full_name AS student_name,
    d.attempt_number,
    d.grade,
    d.attempt_date,
    c.course_name
FROM quiz q
JOIN do d ON q.quiz_id = d.quiz_id
JOIN student s ON d.student_id = s.student_id
JOIN user u ON s.user_id = u.user_id
JOIN course c ON q.course_id = c.course_id;