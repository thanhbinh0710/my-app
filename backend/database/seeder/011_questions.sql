-- Sample questions for quizzes (using actual quiz IDs from database)
INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Biến trong lập trình là gì?', 'multiple_choice', 'Vùng nhớ để lưu trữ dữ liệu', 'Một loại hàm,Một thuật toán,Một chương trình',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO1013' AND q.quiz_name LIKE '%giữa kỳ%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Vòng lặp for được sử dụng để làm gì?', 'multiple_choice', 'Lặp lại một đoạn code với số lần xác định', 'Tạo điều kiện,Khai báo biến,Kết thúc chương trình',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO1013' AND q.quiz_name LIKE '%giữa kỳ%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Python có phải là ngôn ngữ lập trình hướng đối tượng?', 'true_false', 'true', '',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO1013' AND q.quiz_name LIKE '%Hàm%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Viết hàm tính giai thừa của một số nguyên dương', 'short_answer', 'Dùng đệ quy hoặc vòng lặp', '',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO1013' AND q.quiz_name LIKE '%Hàm%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Stack hoạt động theo nguyên tắc nào?', 'multiple_choice', 'LIFO (Last In First Out)', 'FIFO,Random,FILO',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO1014' AND q.quiz_name LIKE '%Cấu trúc%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Độ phức tạp của thuật toán Quick Sort trung bình là?', 'multiple_choice', 'O(n log n)', 'O(n),O(n²),O(log n)',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO1014' AND q.quiz_name LIKE '%Cấu trúc%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Binary Search Tree có thể có node trùng lặp', 'true_false', 'false', '',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO1014' AND q.quiz_name LIKE '%thuật toán%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Câu lệnh SQL nào dùng để lấy dữ liệu?', 'multiple_choice', 'SELECT', 'INSERT,UPDATE,DELETE',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO3013' AND q.quiz_name LIKE '%SQL%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Khóa chính (Primary Key) có thể NULL không?', 'true_false', 'false', '',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO3013' AND q.quiz_name LIKE '%SQL%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Loại join nào trả về tất cả bản ghi từ bảng trái?', 'multiple_choice', 'LEFT JOIN', 'RIGHT JOIN,INNER JOIN,FULL JOIN',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO3013' AND q.quiz_name LIKE '%Thiết kế%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'Mô hình OSI có bao nhiêu tầng?', 'multiple_choice', '7', '5,6,8',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO3015' AND q.quiz_name LIKE '%mạng cơ bản%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'HTTP hoạt động ở tầng nào của mô hình OSI?', 'multiple_choice', 'Application Layer', 'Transport Layer,Network Layer,Physical Layer',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO3015' AND q.quiz_name LIKE '%mạng cơ bản%' LIMIT 1;

INSERT IGNORE INTO question (content, type, answer, false_options, quiz_id, section_id, teacher_id, course_id)
SELECT 'TCP là giao thức tin cậy', 'true_false', 'true', '',
  q.quiz_id, q.section_id, q.teacher_id, q.course_id
FROM quiz q WHERE q.course_id = 'CO3015' AND q.quiz_name LIKE '%giữa kỳ%' LIMIT 1;