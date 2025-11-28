INSERT IGNORE INTO user (email, role, username, password, full_name) VALUES
('admin@hcmut.edu.vn', 'admin', 'admin', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Quản trị viên Hệ thống'),
('dean.cse@hcmut.edu.vn', 'admin', 'dean_cse', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Trưởng khoa CSE');

INSERT IGNORE INTO user (email, role, username, password, full_name) VALUES
('nguyen.van.an@hcmut.edu.vn', 'teacher', 'nvan.an', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'PGS.TS. Nguyễn Văn An'),
('tran.thi.binh@hcmut.edu.vn', 'teacher', 'tthi.binh', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'TS. Trần Thị Bình'),
('le.van.cuong@hcmut.edu.vn', 'teacher', 'lvan.cuong', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'ThS. Lê Văn Cường'),
('pham.thi.dung@hcmut.edu.vn', 'teacher', 'pthi.dung', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'TS. Phạm Thị Dung'),
('vo.minh.duc@hcmut.edu.vn', 'teacher', 'vminh.duc', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'PGS.TS. Võ Minh Đức'),
('hoang.thi.lan@hcmut.edu.vn', 'teacher', 'hthi.lan', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'TS. Hoàng Thị Lan'),
('bui.van.nam@hcmut.edu.vn', 'teacher', 'bvan.nam', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'ThS. Bùi Văn Nam'),
('dang.thi.yen@hcmut.edu.vn', 'teacher', 'dthi.yen', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'TS. Đặng Thị Yến');

INSERT IGNORE INTO user (email, role, username, password, full_name) VALUES
-- K22 Students (2022 intake)
('2213001@student.hcmut.edu.vn', 'student', '2213001', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Nguyễn Minh Anh'),
('2213002@student.hcmut.edu.vn', 'student', '2213002', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Trần Văn Bảo'),
('2213003@student.hcmut.edu.vn', 'student', '2213003', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Lê Thị Chi'),
('2213004@student.hcmut.edu.vn', 'student', '2213004', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Phạm Văn Đức'),
('2213005@student.hcmut.edu.vn', 'student', '2213005', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Võ Thị Linh'),
('2213006@student.hcmut.edu.vn', 'student', '2213006', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Hoàng Văn Nam'),
('2213007@student.hcmut.edu.vn', 'student', '2213007', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Đỗ Thị Oanh'),
('2213008@student.hcmut.edu.vn', 'student', '2213008', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Ngô Văn Phúc'),
('2213009@student.hcmut.edu.vn', 'student', '2213009', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Bùi Thị Quỳnh'),
('2213010@student.hcmut.edu.vn', 'student', '2213010', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Lý Văn Sang'),
-- K23 Students (2023 intake)
('2313001@student.hcmut.edu.vn', 'student', '2313001', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Trương Minh Tâm'),
('2313002@student.hcmut.edu.vn', 'student', '2313002', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Phan Thị Thảo'),
('2313003@student.hcmut.edu.vn', 'student', '2313003', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Vũ Văn Thắng'),
('2313004@student.hcmut.edu.vn', 'student', '2313004', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Mai Thị Thu'),
('2313005@student.hcmut.edu.vn', 'student', '2313005', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeP4s5Y9QpOdkT5T.', 'Đinh Văn Tùng');