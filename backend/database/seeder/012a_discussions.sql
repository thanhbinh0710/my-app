-- Simple discussions for sections that exist

INSERT IGNORE INTO discussion (title, question, answer, status, section_id, course_id, student_id, teacher_id)
VALUES
-- CO1014 discussions
('Sự khác biệt giữa ngôn ngữ biên dịch và thông dịch?', 
 'Có ai có thể giải thích sự khác biệt chính giữa ngôn ngữ biên dịch như C và ngôn ngữ thông dịch như Python không?', 
 'Ngôn ngữ biên dịch chuyển đổi code sang mã máy trước khi thực thi, trong khi ngôn ngữ thông dịch thực thi code từng dòng.',
 'answered', 1, 'CO1014', 14, 1),

('Làm sao để debug vòng lặp vô hạn?', 
 'Tôi liên tục gặp vòng lặp vô hạn trong code. Có chiến lược nào để debug không?', 
 NULL,
 'open', 2, 'CO1014', 15, NULL),

-- CO2013 discussions
('Độ phức tạp của thuật toán Quick Sort?', 
 'Em có thể giải thích độ phức tạp thời gian của Quick Sort trong các trường hợp tốt nhất, trung bình và xấu nhất không?', 
 'Quick Sort có độ phức tạp O(n log n) trong trường hợp tốt nhất và trung bình, nhưng O(n²) trong trường hợp xấu nhất khi pivot được chọn không tốt.',
 'answered', 8, 'CO2013', 16, 2),

-- CO3014 discussions  
('Sự khác biệt giữa process và thread?', 
 'Process và thread khác nhau như thế nào? Khi nào nên dùng multi-threading?', 
 'Process là chương trình độc lập có không gian bộ nhớ riêng. Thread là đơn vị thực thi nhỏ hơn trong process, chia sẻ bộ nhớ. Multi-threading phù hợp cho các tác vụ I/O hoặc cần xử lý song song.',
 'answered', 15, 'CO3014', 17, 3),

-- CO3015 discussions
('TCP vs UDP - Khi nào nên dùng?', 
 'TCP và UDP khác nhau ở điểm nào và trong tình huống nào nên sử dụng mỗi giao thức?', 
 NULL,
 'open', 18, 'CO3015', 18, NULL),

-- CO4017 discussions
('React vs Vue - Framework nào tốt hơn?', 
 'Em đang phân vân giữa React và Vue cho dự án web. Thầy có thể tư vấn giúp em được không?', 
 'Cả hai đều tuyệt vời. React có cộng đồng lớn hơn và nhiều việc làm hơn. Vue có learning curve nhẹ nhàng hơn và documentation tốt. Chọn dựa trên yêu cầu dự án và team của bạn.',
 'answered', 37, 'CO4017', 14, 5);