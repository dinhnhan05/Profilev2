"use client";

import Head from "next/head";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Firebase auth config
import Link from "next/link";
import { toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Danh sách các email hợp lệ
  const validEmails = ["hackerdn55@gmail.com", "thêm email vào đây"];

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Xóa các toast cũ
    toast.dismiss();

    // Kiểm tra nếu không nhập gì
    if (email.trim() === "") {
      toast.error("Vui lòng nhập email.");
      return;
    }

    // Kiểm tra email không hợp lệ
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      return;
    }

    // Kiểm tra email không trong danh sách hợp lệ
    if (!validEmails.includes(email)) {
      toast.error("Email này không tồn tại trong hệ thống.");
      return;
    }

    setLoading(true);

    // Hiển thị toast.promise với trạng thái
    await toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          await sendPasswordResetEmail(auth, email);
          resolve("Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email.");
        } catch (error: unknown) {
          if (error instanceof Error) {
            reject("Không thể gửi yêu cầu đặt lại mật khẩu: " + error.message);
          } else {
            reject("Đã xảy ra lỗi không xác định.");
          }
        }
      }),
      {
        loading: "Đang gửi yêu cầu...",
        success: (message) => {
          setEmail(""); // Xóa email khi thành công
          return message;
        },
        error: (error) => error,
      }
    );

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Head>
        <title>Quên mật khẩu - Admin</title>
      </Head>

      <form
        onSubmit={handlePasswordReset}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96"
        noValidate
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Đặt lại mật khẩu
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mb-4 text-white font-semibold rounded-md ${
            loading
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600 transition duration-300"
          }`}
        >
          {loading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
        </button>

        <p className="text-center text-gray-700 mt-1">
          <Link href="/login" className="text-blue-500 hover:underline">
            Quay lại đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
