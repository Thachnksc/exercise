# Student Management System
Ứng dụng quản lý sinh viên với Node.js (backend) và React (frontend), hỗ trợ quản lý điểm số, thống kê, phân quyền admin/student.


## Thiết kế dự án
- Backend: Node.js + Express, dễ mở rộng REST API.
- Frontend: React, state quản lý bằng hooks, dùng Axios để kết nối API.
- Database: MySQL, dễ thao tác với bảng users, scores.
- JWT cho authentication để phân quyền admin/student.
- Repository/Service pattern giúp tách rõ logic business (service) và database (repository).

## Cấu trúc dự án

project-root/
├─ BE/                         # Backend
│  ├─ config/                 # Config hệ thống
│  │   └─ db.js               # Config kết nối DB
│  ├─ Models/                 # Định nghĩa các model dữ liệu
│  ├─ Repository/             # Giao tiếp DB (CRUD)
│  ├─ Service/                # Logic nghiệp vụ (business logic)
│  ├─ Controller/             # Nhận request, gọi service, trả response
│  ├─ middlewares/            # Middleware (auth, role check)
│  ├─ .env                    # Biến môi trường
│  └─ app.js                  # Entry point server
│
├─ FE/                        # Frontend React
│  ├─ components/             # Các component React
│  ├─ pages/                  # Các page (AdminPage, LoginPage,...)
│  ├─ api/                    # Axios instance + interceptors
│  ├─ utils/                  # Helpers frontend (auth, token)
│  └─ App.jsx                 # Root React component
│
├─ package.json
└─ README.md


Cài đặt và chạy project

### Backend

1. Cài dependencies
 cd BE
 npm install

2. tải file .env

3. Chạy server
 node app.js

### Frontend

1. Cài dependencies
 cd fe-react
 npm install

2. Chạy frontend
 npm start



Mục tiêu: Học cách quản lý user, phân quyền, JWT auth, CRUD với React + Node.js, viết API có validation.




