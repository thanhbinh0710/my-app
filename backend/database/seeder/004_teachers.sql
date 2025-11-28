INSERT IGNORE INTO teacher (user_id, certificate, faculty_id)
SELECT u.user_id, 'PGS.TS. Khoa học Máy tính, Đại học Stanford, Mỹ', 1 
FROM user u WHERE u.username = 'nvan.an' AND NOT EXISTS (SELECT 1 FROM teacher t WHERE t.user_id = u.user_id);

INSERT IGNORE INTO teacher (user_id, certificate, faculty_id)
SELECT u.user_id, 'TS. Kỹ thuật Phần mềm, Đại học Tokyo, Nhật Bản', 1 
FROM user u WHERE u.username = 'tthi.binh' AND NOT EXISTS (SELECT 1 FROM teacher t WHERE t.user_id = u.user_id);

INSERT IGNORE INTO teacher (user_id, certificate, faculty_id)
SELECT u.user_id, 'ThS. Hệ thống Thông tin, Đại học Bách khoa TP.HCM', 1 
FROM user u WHERE u.username = 'lvan.cuong' AND NOT EXISTS (SELECT 1 FROM teacher t WHERE t.user_id = u.user_id);

INSERT IGNORE INTO teacher (user_id, certificate, faculty_id)
SELECT u.user_id, 'TS. An toàn Thông tin, Đại học Carnegie Mellon, Mỹ', 1 
FROM user u WHERE u.username = 'pthi.dung' AND NOT EXISTS (SELECT 1 FROM teacher t WHERE t.user_id = u.user_id);

INSERT IGNORE INTO teacher (user_id, certificate, faculty_id)
SELECT u.user_id, 'PGS.TS. Trí tuệ Nhân tạo, Đại học MIT, Mỹ', 1 
FROM user u WHERE u.username = 'vminh.duc' AND NOT EXISTS (SELECT 1 FROM teacher t WHERE t.user_id = u.user_id);

INSERT IGNORE INTO teacher (user_id, certificate, faculty_id)
SELECT u.user_id, 'TS. Khoa học Dữ liệu, Đại học Oxford, Anh', 1 
FROM user u WHERE u.username = 'hthi.lan' AND NOT EXISTS (SELECT 1 FROM teacher t WHERE t.user_id = u.user_id);

INSERT IGNORE INTO teacher (user_id, certificate, faculty_id)
SELECT u.user_id, 'ThS. Mạng máy tính, Đại học Bách khoa TP.HCM', 1 
FROM user u WHERE u.username = 'bvan.nam' AND NOT EXISTS (SELECT 1 FROM teacher t WHERE t.user_id = u.user_id);

INSERT IGNORE INTO teacher (user_id, certificate, faculty_id)
SELECT u.user_id, 'TS. Kỹ thuật Y sinh, Đại học Seoul National, Hàn Quốc', 1 
FROM user u WHERE u.username = 'dthi.yen' AND NOT EXISTS (SELECT 1 FROM teacher t WHERE t.user_id = u.user_id);