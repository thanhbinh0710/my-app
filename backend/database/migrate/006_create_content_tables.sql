-- ============================================
-- Content Tables
-- ============================================

-- lecture table
CREATE TABLE IF NOT EXISTS lecture (
    lecture_id INT AUTO_INCREMENT PRIMARY KEY,
    lecture_name VARCHAR(200) NOT NULL,
    material TEXT,
    state VARCHAR(20) CHECK (state IN ('published', 'draft', 'archived')),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reference VARCHAR(500),
    section_id INT NOT NULL,
    student_id INT,
    teacher_id INT,
    course_id VARCHAR(20),
    FOREIGN KEY (section_id) REFERENCES section(section_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE SET NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- quiz table
CREATE TABLE IF NOT EXISTS quiz (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_name VARCHAR(200) NOT NULL,
    attempts INT DEFAULT 1,
    state VARCHAR(20) CHECK (state IN ('open', 'closed', 'in_progress')),
    duration INT, -- in minutes
    grade DECIMAL(5,2),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    section_id INT NOT NULL,
    teacher_id INT,
    course_id VARCHAR(20),
    FOREIGN KEY (section_id) REFERENCES section(section_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- question table
CREATE TABLE IF NOT EXISTS question (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    type VARCHAR(50) CHECK (type IN ('multiple_choice', 'true_false', 'short_answer', 'essay')),
    answer TEXT,
    false_options TEXT, -- JSON or comma-separated for multiple choice
    quiz_id INT NOT NULL,
    section_id INT,
    teacher_id INT,
    course_id VARCHAR(20),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES section(section_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- discussion table
CREATE TABLE IF NOT EXISTS discussion (
    discussion_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    question TEXT NOT NULL,
    answer TEXT,
    status VARCHAR(20) CHECK (status IN ('open', 'answered', 'closed')),
    section_id INT NOT NULL,
    student_id INT,
    teacher_id INT,
    course_id VARCHAR(20),
    FOREIGN KEY (section_id) REFERENCES section(section_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE SET NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- do table (Student-Quiz relationship - tracks quiz attempts)
CREATE TABLE IF NOT EXISTS do (
    quiz_id INT NOT NULL,
    student_id INT NOT NULL,
    section_id INT,
    grade DECIMAL(5,2),
    progress INT DEFAULT 0,
    teacher_id INT,
    course_id VARCHAR(20),
    attempt_number INT DEFAULT 1,
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (quiz_id, student_id, attempt_number),
    FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES section(section_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;