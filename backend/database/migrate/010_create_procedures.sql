-- =============================================
-- Stored Procedures for Course Management
-- =============================================

DELIMITER //

-- Drop procedures if they exist
DROP PROCEDURE IF EXISTS sp_InsertCourse//
DROP PROCEDURE IF EXISTS sp_UpdateCourse//
DROP PROCEDURE IF EXISTS sp_DeleteCourse//
DROP PROCEDURE IF EXISTS sp_GetStudentsByCourse//
DROP PROCEDURE IF EXISTS sp_Statistic_Students_By_Faculty//

-- Procedure to insert a new course
CREATE PROCEDURE sp_InsertCourse(
    IN p_course_id VARCHAR(20),
    IN p_course_name VARCHAR(200),
    IN p_course_group VARCHAR(50),
    IN p_course_credit INT,
    IN p_teacher_id INT
)
BEGIN
    DECLARE teacher_exists INT DEFAULT 0;
    
    -- Check for duplicate course ID
    IF EXISTS (SELECT 1 FROM course WHERE course_id = p_course_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mã môn học đã tồn tại!';
    END IF;
    
    -- Check credits > 0
    IF p_course_credit <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Số tín chỉ phải lớn hơn 0!';
    END IF;
    
    -- Check teacher exists
    SELECT COUNT(*) INTO teacher_exists FROM teacher WHERE teacher_id = p_teacher_id;
    IF teacher_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Giáo viên không tồn tại!';
    END IF;
    
    INSERT INTO course (course_id, course_name, course_group, course_credit, teacher_id, course_status)
    VALUES (p_course_id, p_course_name, p_course_group, p_course_credit, p_teacher_id, 'active');
END//

-- Procedure to update a course
CREATE PROCEDURE sp_UpdateCourse(
    IN p_course_id VARCHAR(20),
    IN p_course_name VARCHAR(200),
    IN p_course_credit INT,
    IN p_teacher_id INT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM course WHERE course_id = p_course_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Không tìm thấy môn học để cập nhật!';
    END IF;
    
    IF p_course_credit <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Số tín chỉ phải lớn hơn 0!';
    END IF;
    
    UPDATE course 
    SET course_name = p_course_name, course_credit = p_course_credit, teacher_id = p_teacher_id
    WHERE course_id = p_course_id;
END//

-- Procedure to delete a course
CREATE PROCEDURE sp_DeleteCourse(IN p_course_id VARCHAR(20))
BEGIN
    IF EXISTS (SELECT 1 FROM enroll WHERE course_id = p_course_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Không thể xóa môn học vì đã có sinh viên đăng ký!';
    END IF;
    
    DELETE FROM course WHERE course_id = p_course_id;
END//

-- Procedure to get students by course
CREATE PROCEDURE sp_GetStudentsByCourse(IN p_CourseID VARCHAR(20))
BEGIN
    SELECT s.student_id, u.full_name, u.email, e.progress, e.grade
    FROM enroll e
    JOIN student s ON e.student_id = s.student_id
    JOIN user u ON s.user_id = u.user_id
    WHERE e.course_id = p_CourseID
    ORDER BY u.full_name;
END//

-- Procedure for statistics
CREATE PROCEDURE sp_Statistic_Students_By_Faculty()
BEGIN
    SELECT f.faculty_name, COUNT(DISTINCT s.student_id) AS TotalStudents
    FROM faculty f
    JOIN student s ON f.faculty_id = s.faculty_id
    JOIN enroll e ON s.student_id = e.student_id
    WHERE e.course_id = 'CO2014'
    GROUP BY f.faculty_id, f.faculty_name
    HAVING COUNT(DISTINCT s.student_id) > 5
    ORDER BY TotalStudents DESC;
END//

DELIMITER ;