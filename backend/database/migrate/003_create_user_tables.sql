-- ============================================
-- User-related Tables
-- ============================================

-- student table (inherits from user)
CREATE TABLE IF NOT EXISTS student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    admission_date DATE,
    total_credit_earn INT DEFAULT 0,
    total_course_register INT DEFAULT 0,
    total_course_complete INT DEFAULT 0,
    faculty_id INT,
    roadmap_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL,
    FOREIGN KEY (roadmap_id) REFERENCES roadmap(roadmap_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- teacher table (inherits from user)
CREATE TABLE IF NOT EXISTS teacher (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    certificate VARCHAR(200),
    faculty_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;