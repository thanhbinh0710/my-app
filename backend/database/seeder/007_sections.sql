-- Sections for Foundation Courses
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO1013' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L02', c.course_id, t2.teacher_id, 2
FROM course c 
JOIN teacher t2 ON t2.user_id = (SELECT u.user_id FROM user u WHERE u.username = 'tthi.binh')
WHERE c.course_id = 'CO1013' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO1014' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'MI1013' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO2013' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L02', c.course_id, t2.teacher_id, 2
FROM course c 
JOIN teacher t2 ON t2.user_id = (SELECT u.user_id FROM user u WHERE u.username = 'vminh.duc')
WHERE c.course_id = 'CO2013' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO2014' LIMIT 1;

-- Sections for Intermediate Courses
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO3013' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO3014' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO3015' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO3016' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO3017' LIMIT 1;

-- Sections for Advanced Courses
INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4013' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4014' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4015' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4016' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4017' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4018' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4019' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4020' LIMIT 1;

INSERT IGNORE INTO section (section_name, course_id, teacher_id, section_order)
SELECT 'L01', c.course_id, t.teacher_id, 1
FROM course c 
JOIN teacher t ON c.teacher_id = t.teacher_id 
WHERE c.course_id = 'CO4021' LIMIT 1;