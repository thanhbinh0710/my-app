-- Sample lectures for courses (using actual section IDs from database)
INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Giới thiệu về Lập trình', 'Bài giảng về khái niệm cơ bản của lập trình, biến, kiểu dữ liệu', 'published', 'Sách: Introduction to Programming - Chapter 1', 
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Cấu trúc điều khiển', 'Điều kiện if-else, vòng lặp for, while', 'published', 'Sách: Programming Fundamentals - Chapter 3',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Hàm và thủ tục', 'Định nghĩa hàm, tham số, giá trị trả về', 'published', 'Slides: Functions and Procedures',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Mảng và chuỗi', 'Khai báo mảng, thao tác với chuỗi ký tự', 'draft', 'Lab Manual - Array Operations',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Cấu trúc dữ liệu cơ bản', 'Stack, Queue, Linked List', 'published', 'Data Structures Book - Chapter 2',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Thuật toán sắp xếp', 'Bubble Sort, Quick Sort, Merge Sort', 'published', 'Algorithm Analysis - Chapter 4',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Cây và đồ thị', 'Binary Tree, Graph traversal', 'draft', 'Advanced Data Structures',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO1014' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Thiết kế cơ sở dữ liệu', 'ERD, Normalization, Relations', 'published', 'Database Design Fundamentals',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'SQL căn bản', 'SELECT, INSERT, UPDATE, DELETE', 'published', 'SQL Tutorial - W3Schools',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Stored Procedures', 'Functions, Triggers, Views', 'draft', 'Advanced SQL Programming',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3013' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Mạng máy tính cơ bản', 'OSI Model, TCP/IP', 'published', 'Computer Networks - Tanenbaum',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3015' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Giao thức Internet', 'HTTP, HTTPS, DNS, DHCP', 'published', 'Network Protocols Guide',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3015' AND s.section_name = 'L01' LIMIT 1;

INSERT IGNORE INTO lecture (lecture_name, material, state, reference, section_id, teacher_id, course_id)
SELECT 'Bảo mật mạng', 'Firewall, VPN, Encryption', 'draft', 'Network Security Essentials',
  s.section_id, s.teacher_id, s.course_id
FROM section s WHERE s.course_id = 'CO3015' AND s.section_name = 'L01' LIMIT 1;