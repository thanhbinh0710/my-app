-- ============================================
-- Triggers for Maintaining Derived Attributes
-- ============================================

DELIMITER //

-- Drop triggers if they exist
DROP TRIGGER IF EXISTS trg_update_student_credits//
DROP TRIGGER IF EXISTS trg_update_course_registration//
DROP TRIGGER IF EXISTS trg_update_faculty_teacher_count_insert//
DROP TRIGGER IF EXISTS trg_update_faculty_teacher_count_delete//
DROP TRIGGER IF EXISTS trg_Check_Max_Credits_Before_Insert_Enroll//

-- Trigger to update total credits when student completes a course
CREATE TRIGGER trg_update_student_credits
AFTER UPDATE ON enroll
FOR EACH ROW
BEGIN
    IF NEW.complete_date IS NOT NULL AND OLD.complete_date IS NULL THEN
        UPDATE student 
        SET total_credit_earn = total_credit_earn + (
            SELECT course_credit FROM course WHERE course_id = NEW.course_id
        ),
        total_course_complete = total_course_complete + 1
        WHERE student_id = NEW.student_id;
    END IF;
END//

-- Trigger to update course registration count
CREATE TRIGGER trg_update_course_registration
AFTER INSERT ON enroll
FOR EACH ROW
BEGIN
    UPDATE student 
    SET total_course_register = total_course_register + 1
    WHERE student_id = NEW.student_id;
END//

-- Trigger to update faculty teacher count on INSERT
CREATE TRIGGER trg_update_faculty_teacher_count_insert
AFTER INSERT ON teacher
FOR EACH ROW
BEGIN
    UPDATE faculty 
    SET number_of_teacher_in_faculty = number_of_teacher_in_faculty + 1
    WHERE faculty_id = NEW.faculty_id;
END//

-- Trigger to update faculty teacher count on DELETE
CREATE TRIGGER trg_update_faculty_teacher_count_delete
AFTER DELETE ON teacher
FOR EACH ROW
BEGIN
    UPDATE faculty 
    SET number_of_teacher_in_faculty = number_of_teacher_in_faculty - 1
    WHERE faculty_id = OLD.faculty_id;
END//

-- Trigger for business rule: No more than 30 credits per semester
CREATE TRIGGER trg_Check_Max_Credits_Before_Insert_Enroll
BEFORE INSERT ON enroll
FOR EACH ROW
BEGIN
    DECLARE total_credits INT DEFAULT 0;
    DECLARE semester VARCHAR(20);
    
    SET semester = CONCAT(YEAR(NEW.start_date), '-', MONTH(NEW.start_date));
    
    SELECT SUM(c.course_credit) INTO total_credits
    FROM enroll e
    JOIN course c ON e.course_id = c.course_id
    WHERE e.student_id = NEW.student_id
      AND CONCAT(YEAR(e.start_date), '-', MONTH(e.start_date)) = semester;
    
    IF (total_credits + (SELECT course_credit FROM course WHERE course_id = NEW.course_id)) > 30 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sinh viên không được đăng ký quá 30 tín chỉ trong một học kỳ!';
    END IF;
END//

DELIMITER ;