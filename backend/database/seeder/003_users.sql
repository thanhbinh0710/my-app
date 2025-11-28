INSERT IGNORE INTO user (email, role, username, password, full_name) VALUES
('admin@hcmut.edu.vn', 'admin', 'admin', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Quản trị viên Hệ thống'),
('dean.cse@hcmut.edu.vn', 'admin', 'dean_cse', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Trưởng khoa CSE');

INSERT IGNORE INTO user (email, role, username, password, full_name) VALUES
('nguyen.van.an@hcmut.edu.vn', 'teacher', 'nvan.an', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'PGS.TS. Nguyễn Văn An'),
('tran.thi.binh@hcmut.edu.vn', 'teacher', 'tthi.binh', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'TS. Trần Thị Bình'),
('le.van.cuong@hcmut.edu.vn', 'teacher', 'lvan.cuong', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'ThS. Lê Văn Cường'),
('pham.thi.dung@hcmut.edu.vn', 'teacher', 'pthi.dung', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'TS. Phạm Thị Dung'),
('vo.minh.duc@hcmut.edu.vn', 'teacher', 'vminh.duc', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'PGS.TS. Võ Minh Đức'),
('hoang.thi.lan@hcmut.edu.vn', 'teacher', 'hthi.lan', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'TS. Hoàng Thị Lan'),
('bui.van.nam@hcmut.edu.vn', 'teacher', 'bvan.nam', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'ThS. Bùi Văn Nam'),
('dang.thi.yen@hcmut.edu.vn', 'teacher', 'dthi.yen', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'TS. Đặng Thị Yến');

INSERT IGNORE INTO user (email, role, username, password, full_name) VALUES
-- K22 Students (2022 intake)
('2213001@student.hcmut.edu.vn', 'student', '2213001', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Nguyễn Minh Anh'),
('2213002@student.hcmut.edu.vn', 'student', '2213002', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Trần Văn Bảo'),
('2213003@student.hcmut.edu.vn', 'student', '2213003', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Lê Thị Chi'),
('2213004@student.hcmut.edu.vn', 'student', '2213004', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Phạm Văn Đức'),
('2213005@student.hcmut.edu.vn', 'student', '2213005', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Võ Thị Linh'),
('2213006@student.hcmut.edu.vn', 'student', '2213006', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Hoàng Văn Nam'),
('2213007@student.hcmut.edu.vn', 'student', '2213007', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Đỗ Thị Oanh'),
('2213008@student.hcmut.edu.vn', 'student', '2213008', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Ngô Văn Phúc'),
('2213009@student.hcmut.edu.vn', 'student', '2213009', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Bùi Thị Quỳnh'),
('2213010@student.hcmut.edu.vn', 'student', '2213010', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Lý Văn Sang'),
-- K23 Students (2023 intake)
('2313001@student.hcmut.edu.vn', 'student', '2313001', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Trương Minh Tâm'),
('2313002@student.hcmut.edu.vn', 'student', '2313002', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Phan Thị Thảo'),
('2313003@student.hcmut.edu.vn', 'student', '2313003', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Vũ Văn Thắng'),
('2313004@student.hcmut.edu.vn', 'student', '2313004', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Mai Thị Thu'),
('2313005@student.hcmut.edu.vn', 'student', '2313005', '$2b$12$pufDxn70HsEbmpA/zWC6Ye0Eshm0EtZ/rysflDGUZsBLhaawmXHr.', 'Đinh Văn Tùng');