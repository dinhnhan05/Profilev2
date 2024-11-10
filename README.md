This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Nhớ thêm cấu hình dự án config firebase trong src/lib/firebase.ts và cách điều chỉnh trong firebase

1. Tạo dự án trong firebase (tắt cái gì mà gg analytics gì đó ấy)
2. Xong vào dự án đã tạo sẽ thấy app lication -> nhấp vào thêm ứng dụng web..
3. sau đó copy cái phần cofig dán vào tệp như đã nói src/lib/firebase.ts
4. rồi nhấp vào menu bên trái của dự án tạo firebase database và firestore auth
5. Trong firebase database thêm collection tên adminStatus sau đó phần id doc nhập tên status rồi phần dưới thêm hai trường ( là field)
   *dòng 1 tên isOnline -> loại boolean -> chọn true hay false gì cũng được
   *dòng 2 tên lastActive -> loại timestamp -> thời gian ngày tháng năm giờ chọn đại cũng ok
6. Trong firebase auth bật lên sau đó chọn phương thức đăng nhập chọn email/password bật đó lên sau đó quay qua users thêm email/password của bạn vô là ok
7. Vậy là ok xong giờ chỉ cách bật tắt hoạt động trong web
   *ví dụ, https://tenmiencuaban.com/admin (nhập thêm /admin để vào trang admin để bật tắt hoạt động)
   *Khi vào sẽ bắt bạn đăng nhập trước khi vào trang admin (nếu lần đầu bạn vào), người khác không vô trang admin được đâu.
   *trong đăng nhập hãy nhập email/password như tôi đaz hưongs dẫn trên nhập thông tin bạn đã tạo trong firebase auth của bạn vô là ok, sẽ tự chuyển qua admin.
## Cảm ơn đã dùng code, tạm biệt=))