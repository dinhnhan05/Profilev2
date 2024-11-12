"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";  // Firebase auth config
import Link from "next/link";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("user-not-found")) {
          setError("Email này không tồn tại trong hệ thống.");
        } else {
          setError("Không thể gửi yêu cầu đặt lại mật khẩu: " + error.message);
        }
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Tự động ẩn Toast sau 3 giây
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 3000); // 3 giây
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <>
      <Head>
        <title>Quên mật khẩu - Admin</title> {/* Tiêu đề của trang forgot password */}
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <form onSubmit={handlePasswordReset} className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Đặt lại mật khẩu</h2>

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
            className={`w-full py-3 mb-4 text-white font-semibold rounded-md ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} transition duration-300`}
          >
            {loading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
          </button>

          {/* Toast thông báo thành công */}
          {message && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg z-50">
              <p>{message}</p>
            </div>
          )}

          {/* Toast thông báo lỗi */}
          {error && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg z-50">
              <p>{error}</p>
            </div>
          )}

          <p className="text-center text-gray-700 mt-4">
            <Link href="/login" className="text-blue-500 hover:underline">
              Quay lại đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
