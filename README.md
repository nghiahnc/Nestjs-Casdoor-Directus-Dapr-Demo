# NestJS – Casdoor – Directus – Dapr Demo

## 1. Overview

Dự án gồm **2 service chính** chạy theo mô hình microservice và giao tiếp với nhau qua **Dapr Service Invocation**:

### 🔹 Service A (service-a)

* Chứa **API CRUD**
* Kết nối **Directus** để thao tác dữ liệu (items)
* Cung cấp các endpoint như:

  * `GET /posts`
  * `POST /posts`
  * `PATCH /posts/:id`
  * `DELETE /posts/:id`
* Không xử lý giao diện hay đăng nhập

### 🔹 Service B (service-b)

* Là **web chính / gateway**
* Tích hợp **Casdoor** để đăng nhập (OAuth)
* Có các route web như:

  * `/` (home)
  * `/na` (page cần login)
  * `/auth/login`
  * `/auth/callback`
* Sau khi đăng nhập thành công, Service B sẽ **invoke API của Service A** thông qua Dapr

> Service B **không gọi trực tiếp Service A bằng port**, mà gọi qua Dapr sidecar.

---

## 2. Thư viện & công nghệ sử dụng

### Backend

* **Node.js**
* **NestJS**
* **TypeScript**

### Giao tiếp & kiến trúc

* **Dapr** (Service Invocation, Pub/Sub – nếu có)
* **Axios** (HTTP client)

### Auth & CMS

* **Casdoor** (OAuth / SSO)
* **Directus** (Headless CMS)

### Khác

* **express-session** (lưu session đăng nhập)
* **Redis** (nếu dùng cho pub/sub hoặc session)

---

## 3. Cách chạy dự án

### 3.1 Chuẩn bị

* Đã cài:

  * Node.js (>= 18)
  * Dapr CLI
  * Docker (để chạy Directus, Redis, Casdoor)

* Khởi động các service phụ trợ:

  * Directus
  * Casdoor
  * Redis

---

### 3.2 Chạy Service A (CRUD API)

dapr run --app-id service-b --app-port 5000 --dapr-http-port 3501 npm run start:devcalhost:4000`

* Invoke qua Dapr:
  dapr run --app-id service-b --app-port 5000 --dapr-http-port 3501 npm run start:dev## 3.3 Chạy Service B (Web + Auth)

dapr run --app-id service-b --app-port 5000 --dapr-http-portcalhost:5000`

* Service B gọi Service A qua:

```
http://localhost:3501/v1.0/invoke/service-a/method/posts
```

---

## 4. Ghi chú

* Mỗi service **có Dapr sidecar riêng**
* Không dùng app port để gọi `/v1.0/invoke`
* Repo sử dụng **monorepo** (ServiceA & ServiceB chung 1 Git repo)

---

## 5. Mục đích demo

* Hiểu kiến trúc microservice với Dapr
* Demo OAuth login với Casdoor
* Tách biệt rõ:

  * Service xử lý dữ liệu (A)
  * Service xử lý web & auth (B)
