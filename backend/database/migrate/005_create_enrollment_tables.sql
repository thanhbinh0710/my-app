-- ============================================
-- Relationship Tables
-- ============================================

-- enroll table (Student-Course relationship)
CREATE TABLE IF NOT EXISTS enroll (
    course_id VARCHAR(20) NOT NULL,
    student_id INT NOT NULL,
    start_date DATE DEFAULT (CURRENT_DATE),
    complete_date DATE,
    grade DECIMAL(5,2),
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- contain table (Roadmap-Course relationship)
CREATE TABLE IF NOT EXISTS contain (
    course_id VARCHAR(20) NOT NULL,
    roadmap_id INT NOT NULL,
    `order` INT,
    PRIMARY KEY (course_id, roadmap_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (roadmap_id) REFERENCES roadmap(roadmap_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- teach table (Teacher-Roadmap relationship)
CREATE TABLE IF NOT EXISTS teach (
    teacher_id INT NOT NULL,
    roadmap_id INT NOT NULL,
    schedule VARCHAR(200),
    PRIMARY KEY (teacher_id, roadmap_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (roadmap_id) REFERENCES roadmap(roadmap_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;