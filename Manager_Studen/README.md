# Student Management System

Ứng dụng quản lý sinh viên với Node.js (backend) và React (frontend), hỗ trợ quản lý điểm số, thống kê, phân quyền admin/student.

## Thiết kế dự án

- Backend: Node.js + Express, dễ mở rộng REST API.
- Frontend: React, state quản lý bằng hooks, dùng Axios để kết nối API.
- Database: MySQL, dễ thao tác với bảng users, scores.
- JWT cho authentication để phân quyền admin/student.
- Repository/Service pattern giúp tách rõ logic business (service) và database (repository).
- test: postman, Testing API

## Cấu trúc dự án

/BE

- /config # DB, config môi trường
- /Controller # Xử lý request & response
- /Repository # Truy vấn DB
- /Service # Logic nghiệp vụ
- /Models # Các class mô hình dữ liệu
- /middlewares # Auth, kiểm tra role
- index.js # Entry point

/FE

- /components # React components
- /pages # Các page (AdminPage, LoginPage...)
- /api # axios instance, interceptors
- /utils # helper (auth, token)
- App.tsx
- index.ts

Cài đặt và chạy project

### Backend

1. Cài dependencies
   cd BE
   npm install

2. tải file .env

3. Chạy server
   node app.js

### Cấu hình Database

1. Import dữ liệu mẫu
   mysql -u manager_user -p manager_student < Database.sql

2. Đồng bộ Prisma schema
   npx prisma db push

### Frontend

1. Cài dependencies
   cd fe-react
   npm install

2. Chạy frontend
   npm run dev

## Cấu trúc API

Method - Endpoint - Mô tả - Auth/Role
POST - /login - Đăng nhập - Không
GET - /students - Lấy danh sách sinh viên + điểm - Admin
POST - /students/create - Tạo sinh viên mới - Admin
GET - /students/stats - Lấy thống kê điểm - Admin
GET - /score - Lấy điểm sinh viên hiện tại - User/Admin
GET - /students/check/:name - Kiểm tra sinh viên tồn tại - Admin

## Testing API

Postman: import collection, test từng route.
Ex: curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"userName": "admin", "password": "Admin@123"}'

Mục tiêu: Học cách quản lý user, phân quyền, JWT auth, CRUD với React + Node.js, viết API có validation.
