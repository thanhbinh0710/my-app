-- ============================================
-- Course-related Tables
-- ============================================

-- course table
CREATE TABLE IF NOT EXISTS course (
    course_id VARCHAR(20) PRIMARY KEY,
    course_name VARCHAR(200) NOT NULL,
    course_group VARCHAR(50),
    creation_date DATE DEFAULT (CURRENT_DATE),
    course_passing_grade DECIMAL(5,2) DEFAULT 4.0,
    course_status VARCHAR(20) CHECK (course_status IN ('active', 'inactive', 'archived')),
    course_credit INT NOT NULL,
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- section table
CREATE TABLE IF NOT EXISTS section (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    section_name VARCHAR(100) NOT NULL,
    course_id VARCHAR(20) NOT NULL,
    teacher_id INT,
    section_order INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;