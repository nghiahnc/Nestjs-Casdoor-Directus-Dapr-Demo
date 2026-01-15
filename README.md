#NESTJS – CASDOOR – DIRECTUS – DAPR DEMO

##1. OVERVIEW

Dự án được xây dựng theo mô hình microservice, gồm hai service chính giao tiếp với nhau thông qua Dapr Service Invocation.

Service A (service-a) đóng vai trò là service xử lý dữ liệu. Service này cung cấp các API CRUD và kết nối trực tiếp với Directus để thao tác dữ liệu (items). Service A không xử lý giao diện và không đảm nhiệm chức năng đăng nhập.

Các API tiêu biểu của Service A bao gồm:

* Lấy danh sách dữ liệu (GET /posts)
* Thêm mới dữ liệu (POST /posts)
* Cập nhật dữ liệu (PATCH /posts/:id)
* Xóa dữ liệu (DELETE /posts/:id)

Service B (service-b) là web chính của hệ thống. Service này chịu trách nhiệm xử lý đăng nhập, xác thực người dùng và điều hướng giao diện. Service B tích hợp Casdoor để thực hiện đăng nhập theo cơ chế OAuth. Sau khi người dùng đăng nhập thành công, Service B sẽ gọi các API CRUD của Service A thông qua Dapr thay vì gọi trực tiếp bằng port.

>>Mô hình này giúp tách biệt rõ ràng giữa service xử lý dữ liệu và service xử lý giao diện, đồng thời minh họa cách các microservice giao tiếp với nhau thông qua Dapr.

##2. THƯ VIỆN VÀ CÔNG NGHỆ SỬ DỤNG

###Ngôn ngữ và framework:

* Node.js
* TypeScript
* NestJS

###Kiến trúc và giao tiếp:

* Dapr (Service Invocation)
* Axios (HTTP client)

###Xác thực và quản lý dữ liệu:

* Casdoor (OAuth, SSO)
* Directus (Headless CMS)

###Các thư viện hỗ trợ khác:

* express-session (quản lý session đăng nhập)


##3. CÁCH CHẠY DỰ ÁN

Trước khi chạy dự án, cần cài đặt Node.js, Dapr CLI và Docker. Đồng thời khởi động các service phụ trợ như Directus, Casdoor và Redis.

###Chạy Service A (CRUD API):
####Sử dụng lệnh: 
dapr run --app-id service-a --app-port 4000 --dapr-http-port 3500 npm run start:dev

Sau khi chạy, Service A lắng nghe tại cổng 4000. Các API có thể được gọi trực tiếp qua cổng này hoặc được invoke thông qua Dapr bằng Dapr HTTP port.

###Chạy Service B (Web + Auth):
####Sử dụng lệnh: 
dapr run --app-id service-b --app-port 5000 --dapr-http-port 3501 npm run start:dev

Service B chạy tại cổng 5000 và sử dụng Dapr sidecar riêng để gọi Service A thông qua Service Invocation.

$. MỤC ĐÍCH DEMO

Dự án nhằm minh họa cách xây dựng hệ thống microservice với NestJS và Dapr, cách tích hợp xác thực người dùng bằng Casdoor, sử dụng các API có sẵn của Directus cms dể thực hiện CRUD, cũng như cách tách biệt rõ ràng giữa service xử lý dữ liệu và service xử lý giao diện trong một hệ thống phân tán. 
