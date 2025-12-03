-- =============================================
-- Stored Procedures for Course Management
-- =============================================

DELIMITER //

-- Drop procedures if they exist
DROP PROCEDURE IF EXISTS sp_InsertCourse//
DROP PROCEDURE IF EXISTS sp_UpdateCourse//
DROP PROCEDURE IF EXISTS sp_DeleteCourse//
DROP PROCEDURE IF EXISTS sp_GetCoursesWithFilters//
DROP PROCEDURE IF EXISTS sp_GetCourseStatisticsByTeacher//
DROP PROCEDURE IF EXISTS sp_GetCourseDetailsWithStudents//
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

CREATE PROCEDURE sp_GetCoursesWithFilters(
    IN p_course_group VARCHAR(50),
    IN p_min_credit INT,
    IN p_teacher_name VARCHAR(100),
    IN p_sort_by VARCHAR(20)
)
BEGIN
    -- Validate input
    IF p_min_credit < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Số tín chỉ tối thiểu không hợp lệ!';
    END IF;
    
    -- Default sort
    IF p_sort_by IS NULL OR p_sort_by = '' THEN
        SET p_sort_by = 'course_id';
    END IF;
    
    -- Query with filters
    SELECT 
        c.course_id,
        c.course_name,
        c.course_group,
        c.course_credit,
        c.course_status,
        u.full_name AS teacher_name,
        f.faculty_name,
        COUNT(DISTINCT e.student_id) AS total_students,
        c.creation_date
    FROM course c
    INNER JOIN teacher t ON c.teacher_id = t.teacher_id
    INNER JOIN user u ON t.user_id = u.user_id
    INNER JOIN faculty f ON t.faculty_id = f.faculty_id
    LEFT JOIN enroll e ON c.course_id = e.course_id
    WHERE 
        (p_course_group IS NULL OR p_course_group = '' OR c.course_group = p_course_group)
        AND (p_min_credit = 0 OR c.course_credit >= p_min_credit)
        AND (p_teacher_name IS NULL OR p_teacher_name = '' OR u.full_name LIKE CONCAT('%', p_teacher_name, '%'))
    GROUP BY c.course_id, c.course_name, c.course_group, c.course_credit, 
             c.course_status, u.full_name, f.faculty_name, c.creation_date
    ORDER BY 
        CASE 
            WHEN p_sort_by = 'course_id' THEN c.course_id
            WHEN p_sort_by = 'course_name' THEN c.course_name
            ELSE c.course_id
        END,
        CASE 
            WHEN p_sort_by = 'course_credit' THEN c.course_credit
            WHEN p_sort_by = 'total_students' THEN COUNT(DISTINCT e.student_id)
            ELSE 0
        END DESC;
END//

CREATE PROCEDURE sp_GetCourseStatisticsByTeacher(
    IN p_faculty_id INT,
    IN p_min_students INT,
    IN p_min_courses INT
)
BEGIN
    -- Validate input
    IF p_min_students < 0 THEN
        SET p_min_students = 0;
    END IF;
    
    IF p_min_courses < 0 THEN
        SET p_min_courses = 1;
    END IF;
    
    SELECT 
        t.teacher_id,
        u.full_name AS teacher_name,
        u.email AS teacher_email,
        f.faculty_name,
        COUNT(DISTINCT c.course_id) AS total_courses,
        SUM(c.course_credit) AS total_credits,
        COUNT(DISTINCT e.student_id) AS total_students,
        AVG(e.grade) AS average_grade,
        MAX(c.creation_date) AS latest_course_date
    FROM teacher t
    INNER JOIN user u ON t.user_id = u.user_id
    INNER JOIN faculty f ON t.faculty_id = f.faculty_id
    INNER JOIN course c ON t.teacher_id = c.teacher_id
    LEFT JOIN enroll e ON c.course_id = e.course_id
    WHERE 
        (p_faculty_id IS NULL OR p_faculty_id = 0 OR t.faculty_id = p_faculty_id)
        AND c.course_status = 'active'
    GROUP BY t.teacher_id, u.full_name, u.email, f.faculty_name
    HAVING 
        COUNT(DISTINCT e.student_id) >= p_min_students
        AND COUNT(DISTINCT c.course_id) >= p_min_courses
    ORDER BY total_students DESC, total_courses DESC;
END//

CREATE PROCEDURE sp_GetCourseDetailsWithStudents(
    IN p_course_id VARCHAR(20)
)
BEGIN
    -- Validate input
    IF p_course_id IS NULL OR p_course_id = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mã khóa học không được để trống!';
    END IF;
    
    -- Course info
    SELECT 
        c.course_id,
        c.course_name,
        c.course_group,
        c.course_credit,
        c.course_status,
        u.full_name AS teacher_name,
        u.email AS teacher_email,
        f.faculty_name,
        COUNT(DISTINCT e.student_id) AS total_enrolled,
        AVG(e.grade) AS average_grade,
        COUNT(DISTINCT s.section_id) AS total_sections
    FROM course c
    INNER JOIN teacher t ON c.teacher_id = t.teacher_id
    INNER JOIN user u ON t.user_id = u.user_id
    INNER JOIN faculty f ON t.faculty_id = f.faculty_id
    LEFT JOIN enroll e ON c.course_id = e.course_id
    LEFT JOIN section s ON c.course_id = s.course_id
    WHERE c.course_id = p_course_id
    GROUP BY c.course_id, c.course_name, c.course_group, c.course_credit, 
             c.course_status, u.full_name, u.email, f.faculty_name;
    
    -- Students list
    SELECT 
        st.student_id,
        u2.full_name AS student_name,
        u2.email AS student_email,
        r.roadmap_name,
        e.progress,
        e.grade,
        e.start_date
    FROM enroll e
    INNER JOIN student st ON e.student_id = st.student_id
    INNER JOIN user u2 ON st.user_id = u2.user_id
    LEFT JOIN roadmap r ON st.roadmap_id = r.roadmap_id
    WHERE e.course_id = p_course_id
    ORDER BY u2.full_name;
END//

DELIMITER ;