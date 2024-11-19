# Cài đặt dự án Next.js

Đây là một dự án [Next.js](https://nextjs.org/) được khởi tạo với [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Bắt đầu

Thực hiện các bước sau để khởi chạy dự án:

1. **Chạy Server Phát Triển:**

    ```bash
    npm run dev
    # hoặc
    yarn dev
    # hoặc
    pnpm dev
    # hoặc
    bun dev
    ```

2. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt để xem kết quả.

3. Bạn có thể bắt đầu chỉnh sửa trang bằng cách sửa file `app/page.tsx`. Trang sẽ tự động cập nhật khi bạn chỉnh sửa.

---

## Cấu hình Firebase

### Các bước cấu hình Firebase:

1. **Tạo dự án Firebase:**
   - Truy cập Firebase Console và tạo một dự án mới.
   - Tắt Google Analytics (hoặc các dịch vụ phân tích không cần thiết).

2. **Thêm ứng dụng Web vào Firebase:**
   - Trong dự án Firebase, vào "Project Overview" -> **Add App** -> **Web App**.
   - Sao chép cấu hình mà Firebase cung cấp và dán vào file `src/lib/firebase.ts`.

3. **Kích hoạt các dịch vụ Firebase:**
   - Trong Firebase Console, bật **Firebase Database**, **Firestore** và **Authentication**.

4. **Cấu hình Firebase Database:**
   - Trong **Firebase Database**, tạo một collection tên là `adminStatus`.
   - Thêm một document có ID là `status` và tạo các trường sau:
     - `isOnline`: Boolean (có thể là true/false).
     - `lastActive`: Timestamp (có thể chọn thời gian bất kỳ).

5. **Cấu hình Firebase Authentication:**
   - Trong **Firebase Authentication**, bật phương thức đăng nhập **Email/Password**.
   - Vào phần **Users** và thêm tài khoản email/password của bạn vào.

---

## Trang Admin

- Để truy cập trang admin, vào:  
  `https://yourdomain.com/admin`
  - Trang sẽ yêu cầu bạn đăng nhập trước khi vào (nếu lần đầu truy cập).
  - Chỉ những người dùng đã được thêm vào trong Firebase Authentication mới có thể đăng nhập.
  - Sau khi đăng nhập, bạn sẽ được chuyển đến trang admin.
- Hoặc truy cập **Trang quản trị** ở trên menu của trang web.
---

## Tích hợp HCaptcha

1. **Thêm API Key:**
   - Thêm API key HCaptcha vào `src/pages/login.tsx` để kích hoạt chức năng CAPTCHA.

---

## Triển khai trên Vercel

- **Triển khai ứng dụng của bạn trên Vercel** bằng cách nhấp vào nút dưới đây:
  - [Triển khai trên Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

- Để biết thêm chi tiết về việc triển khai, xem [Tài liệu Triển khai của Next.js](https://nextjs.org/docs/deployment).

---

## Tìm hiểu thêm

Để tìm hiểu thêm về Next.js, tham khảo các tài nguyên sau:

- [Tài liệu Next.js](https://nextjs.org/docs) - Tìm hiểu về các tính năng và API của Next.js.
- [Học Next.js](https://nextjs.org/learn) - Một hướng dẫn tương tác về Next.js.

Bạn có thể kiểm tra [repository GitHub của Next.js](https://github.com/vercel/next.js/) - mọi đóng góp và phản hồi của bạn đều được chào đón!


## Thông Báo Cập Nhật

- **Ngày cập nhật**: [Ngày 17 tháng 11 năm 2024]
- **Nội dung cập nhật**:  
  Dự án đã được cập nhật với những tính năng và sửa lỗi mới bao gồm:
  - **Thêm tính năng đăng nhập bảo mật**: Đã tích hợp Firebase Authentication với phương thức đăng nhập qua Email và Mật khẩu.
  - **Cải tiến giao diện người dùng**: Giao diện trang đăng nhập đã được tối ưu hóa với các thành phần như hiển thị mật khẩu, thông báo lỗi đẹp mắt, và xác minh CAPTCHA qua hCaptcha.
  - **Tích hợp hCaptcha**: Đã thêm hCaptcha vào trang đăng nhập để bảo vệ khỏi các bot tự động.
  - **Cập nhật cấu hình Firebase**: Cấu hình Firebase đã được tối ưu hóa, bao gồm Firebase Database và Firestore để lưu trữ trạng thái admin.
  - **Thêm toast trong trang đăng nhập và quên mật khẩu**: Thêm một vài toast lỗi và ngăn spam toast
  - **Thêm nút cuộn lên đầu trang khi lướt xuống dưới**
  - **Thêm toast mỗi khi vào trang web**
- <span style="color: red; font-size: 30px;  font-style: italic;">**Dự định sắp tới sẽ thêm một vài tính năng vào trang admin❗**</span>

---

### Lịch sử các cập nhật trước đó

- **Ngày 15 tháng 11 năm 2024**:  
  - Cập nhật tính năng: thêm trang admin.
  - Sửa một vài lỗi nhỏ.


---

## Cảm ơn!

Cảm ơn bạn đã sử dụng mã nguồn này và chúc bạn có một ngày tốt lành!  
Nếu có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với tôi. 😊
![Naruto GIF](https://media.tenor.com/o7LO99ykfccAAAAi/anime-naruto.gif)

