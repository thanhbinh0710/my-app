-- =============================================
-- Functions with Cursors
-- =============================================

DELIMITER //

-- Drop function if it exists
DROP FUNCTION IF EXISTS fn_GetStudentGPA//

-- Function to calculate student GPA using cursor
CREATE FUNCTION fn_GetStudentGPA(p_StudentID INT) RETURNS DECIMAL(4,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_credit INT;
    DECLARE v_grade DECIMAL(5,2);
    DECLARE total_points DECIMAL(10,2) DEFAULT 0;
    DECLARE total_credits INT DEFAULT 0;
    
    DECLARE cur CURSOR FOR
        SELECT c.course_credit, e.grade
        FROM enroll e
        JOIN course c ON e.course_id = c.course_id
        WHERE e.student_id = p_StudentID AND e.grade IS NOT NULL;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    IF NOT EXISTS (SELECT 1 FROM student WHERE student_id = p_StudentID) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sinh viên không tồn tại!';
    END IF;
    
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO v_credit, v_grade;
        IF done THEN LEAVE read_loop; END IF;
        SET total_points = total_points + (v_credit * v_grade);
        SET total_credits = total_credits + v_credit;
    END LOOP;
    CLOSE cur;
    
    IF total_credits = 0 THEN RETURN 0.00; END IF;
    RETURN ROUND(total_points / total_credits, 2);
END//

-- =============================================
-- YÊU CẦU 2.4: Functions với IF/LOOP/Cursor
-- =============================================

-- Function 1: Tính tổng tín chỉ đã hoàn thành của sinh viên theo roadmap
-- Sử dụng: IF, LOOP, Cursor, tham số đầu vào
DROP FUNCTION IF EXISTS fn_CalculateCompletedCredits//
CREATE FUNCTION fn_CalculateCompletedCredits(
    p_student_id INT,
    p_roadmap_id INT
) RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_course_id VARCHAR(20);
    DECLARE v_course_credit INT;
    DECLARE v_grade DECIMAL(5,2);
    DECLARE total_credits INT DEFAULT 0;
    DECLARE course_count INT DEFAULT 0;
    DECLARE passing_grade DECIMAL(5,2) DEFAULT 5.0;
    
    -- Cursor để duyệt qua các khóa học trong roadmap
    DECLARE course_cursor CURSOR FOR
        SELECT c.course_id, c.course_credit, e.grade
        FROM contain ct
        INNER JOIN course c ON ct.course_id = c.course_id
        LEFT JOIN enroll e ON c.course_id = e.course_id AND e.student_id = p_student_id
        WHERE ct.roadmap_id = p_roadmap_id
        ORDER BY ct.`order`;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    -- Kiểm tra tham số đầu vào
    IF p_student_id IS NULL OR p_student_id <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID sinh viên không hợp lệ!';
    END IF;
    
    IF p_roadmap_id IS NULL OR p_roadmap_id <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ID lộ trình không hợp lệ!';
    END IF;
    
    -- Kiểm tra sinh viên tồn tại
    IF NOT EXISTS (SELECT 1 FROM student WHERE student_id = p_student_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sinh viên không tồn tại!';
    END IF;
    
    -- Kiểm tra roadmap tồn tại
    IF NOT EXISTS (SELECT 1 FROM roadmap WHERE roadmap_id = p_roadmap_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Lộ trình không tồn tại!';
    END IF;
    
    -- Mở cursor và duyệt qua các khóa học
    OPEN course_cursor;
    
    credit_loop: LOOP
        FETCH course_cursor INTO v_course_id, v_course_credit, v_grade;
        
        IF done THEN
            LEAVE credit_loop;
        END IF;
        
        SET course_count = course_count + 1;
        
        -- Sử dụng IF để kiểm tra điều kiện đạt môn
        IF v_grade IS NOT NULL THEN
            IF v_grade >= passing_grade THEN
                -- Sinh viên đã hoàn thành môn học này
                SET total_credits = total_credits + v_course_credit;
            END IF;
        END IF;
    END LOOP credit_loop;
    
    CLOSE course_cursor;
    
    RETURN total_credits;
END//

-- Function 2: Tính tỷ lệ hoàn thành lộ trình của sinh viên
-- Sử dụng: IF, WHILE, Cursor, truy vấn dữ liệu
DROP FUNCTION IF EXISTS fn_CalculateRoadmapProgress//
CREATE FUNCTION fn_CalculateRoadmapProgress(
    p_student_id INT
) RETURNS DECIMAL(5,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_roadmap_id INT;
    DECLARE v_total_courses INT DEFAULT 0;
    DECLARE v_completed_courses INT DEFAULT 0;
    DECLARE v_progress DECIMAL(5,2) DEFAULT 0.00;
    DECLARE done INT DEFAULT 0;
    DECLARE v_course_id VARCHAR(20);
    DECLARE v_grade DECIMAL(5,2);
    DECLARE passing_grade DECIMAL(5,2) DEFAULT 5.0;
    
    -- Cursor để lấy danh sách môn học và điểm
    DECLARE grade_cursor CURSOR FOR
        SELECT ct.course_id, e.grade
        FROM student s
        INNER JOIN contain ct ON s.roadmap_id = ct.roadmap_id
        LEFT JOIN enroll e ON ct.course_id = e.course_id AND e.student_id = s.student_id
        WHERE s.student_id = p_student_id
        ORDER BY ct.`order`;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    -- Kiểm tra tham số đầu vào
    IF p_student_id IS NULL OR p_student_id <= 0 THEN
        RETURN 0.00;
    END IF;
    
    -- Kiểm tra sinh viên tồn tại và lấy roadmap_id
    SELECT roadmap_id INTO v_roadmap_id
    FROM student 
    WHERE student_id = p_student_id;
    
    IF v_roadmap_id IS NULL THEN
        RETURN 0.00;
    END IF;
    
    -- Đếm tổng số môn trong lộ trình
    SELECT COUNT(*) INTO v_total_courses
    FROM contain
    WHERE roadmap_id = v_roadmap_id;
    
    -- Nếu không có môn học nào
    IF v_total_courses = 0 THEN
        RETURN 0.00;
    END IF;
    
    -- Mở cursor và đếm số môn đã hoàn thành
    OPEN grade_cursor;
    
    grade_loop: LOOP
        FETCH grade_cursor INTO v_course_id, v_grade;
        
        IF done THEN
            LEAVE grade_loop;
        END IF;
        
        -- Kiểm tra nếu đã hoàn thành môn học
        IF v_grade IS NOT NULL AND v_grade >= passing_grade THEN
            SET v_completed_courses = v_completed_courses + 1;
        END IF;
    END LOOP grade_loop;
    
    CLOSE grade_cursor;
    
    -- Tính phần trăm hoàn thành
    IF v_total_courses > 0 THEN
        SET v_progress = (v_completed_courses / v_total_courses) * 100;
    END IF;
    
    RETURN ROUND(v_progress, 2);
END//

DELIMITER ;