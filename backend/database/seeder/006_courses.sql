-- Semester 1 & 2 Courses (Foundation)
INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO1013', 'Nhập môn Lập trình', 'Lập trình cơ bản', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO1014', 'Kỹ thuật Lập trình', 'Lập trình cơ bản', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'MI1013', 'Toán rời rạc', 'Toán học', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO2013', 'Cấu trúc dữ liệu và Giải thuật', 'Lập trình nâng cao', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO2014', 'Lập trình Hướng đối tượng', 'Lập trình nâng cao', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

-- Semester 3 & 4 Courses (Intermediate)
INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO3013', 'Hệ cơ sở dữ liệu', 'Hệ thống', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO3014', 'Hệ điều hành', 'Hệ thống', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'pthi.dung' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO3015', 'Mạng máy tính', 'Hệ thống', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'bvan.nam' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO3016', 'Kỹ thuật Phần mềm', 'Công nghệ phần mềm', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO3017', 'Kiến trúc Máy tính', 'Hệ thống', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'vminh.duc' LIMIT 1;

-- Advanced Courses (Semester 5-8)
INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4013', 'Trí tuệ Nhân tạo', 'AI/ML', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'vminh.duc' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4014', 'Học máy', 'AI/ML', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'vminh.duc' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4015', 'Khoa học Dữ liệu', 'AI/ML', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'hthi.lan' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4016', 'An toàn Thông tin', 'Bảo mật', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'pthi.dung' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4017', 'Phát triển Ứng dụng Web', 'Ứng dụng', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'lvan.cuong' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4018', 'Phát triển Ứng dụng Di động', 'Ứng dụng', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'tthi.binh' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4019', 'Xử lý Ảnh số', 'Đồ họa & Thị giác', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'dthi.yen' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4020', 'Hệ thống Phân tán', 'Hệ thống', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'bvan.nam' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4021', 'Thiết kế và Phân tích Giải thuật', 'Lập trình nâng cao', 5.0, 'active', 4, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;

INSERT IGNORE INTO course (course_id, course_name, course_group, course_passing_grade, course_status, course_credit, teacher_id)
SELECT 'CO4999', 'Đồ án Tốt nghiệp', 'Đồ án', 10.0, 'active', 10, t.teacher_id 
FROM teacher t JOIN user u ON t.user_id = u.user_id WHERE u.username = 'nvan.an' LIMIT 1;