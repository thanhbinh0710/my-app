-- Sample discussions (using actual section and student IDs)
INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Thắc mắc về vòng lặp while', 'Em không hiểu vòng lặp while', 'Vòng lặp while sẽ chạy khi điều kiện đúng', 'answered',
  s.section_id, st.student_id, s.teacher_id, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' AND u.username = '2213001' LIMIT 1;

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Cách sử dụng hàm đệ quy', 'Làm thế nào để viết hàm đệ quy tính Fibonacci?', 'Dùng công thức F(n) = F(n-1) + F(n-2)', 'answered',
  s.section_id, st.student_id, s.teacher_id, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' AND u.username = '2213003' LIMIT 1;

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Lỗi syntax trong Python', 'Code của em bị lỗi khi dùng print', 'Trong Python 3 print là hàm cần có dấu ngoặc', 'answered',
  s.section_id, st.student_id, s.teacher_id, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' AND u.username = '2213005' LIMIT 1;

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Hỏi về bài tập mảng', 'Em muốn hỏi cách sắp xếp mảng theo thứ tự giảm dần', NULL, 'open',
  s.section_id, st.student_id, NULL, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' AND u.username = '2213007' LIMIT 1;

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Hiểu về Linked List', 'Tại sao Linked List lại hiệu quả hơn Array?', 'Linked List không cần dịch chuyển phần tử khi insert/delete', 'answered',
  s.section_id, st.student_id, s.teacher_id, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' AND u.username = '2213002' LIMIT 1;

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Thuật toán Merge Sort', 'Có thể giải thích cách hoạt động của Merge Sort không?', 'Merge Sort chia mảng thành 2 phần rồi gộp lại', 'answered',
  s.section_id, st.student_id, s.teacher_id, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' AND u.username = '2213004' LIMIT 1;

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Binary Tree vs BST', 'Sự khác biệt giữa Binary Tree và BST là gì?', NULL, 'open',
  s.section_id, st.student_id, NULL, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' AND u.username = '2213006' LIMIT 1;

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Câu hỏi về JOIN', 'Khi nào dùng LEFT JOIN, khi nào dùng INNER JOIN?', 'INNER JOIN lấy bản ghi chung, LEFT JOIN lấy tất cả bản ghi bên trái', 'answered',
  s.section_id, st.student_id, s.teacher_id, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO3013' AND s.section_name = 'L01' AND u.username = '2213008' LIMIT 1;

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, student_id, teacher_id, course_id)
SELECT 'Tối ưu hóa query', 'Làm thế nào để query SQL chạy nhanh hơn?', 'Sử dụng INDEX, tránh SELECT *, dùng WHERE hiệu quả', 'answered',
  s.section_id, st.student_id, s.teacher_id, s.course_id
FROM section s, student st JOIN user u ON st.user_id = u.user_id
WHERE s.course_id = 'CO3013' AND s.section_name = 'L01' AND u.username = '2213009' LIMIT 1;