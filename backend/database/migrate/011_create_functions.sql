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

DELIMITER ;