"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Thêm icon cho mắt

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // Thêm message cho thông báo thành công
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin");
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Đăng nhập thành công!");
      router.push("/admin");
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Đăng nhập thất bại:", error.message);
        setError("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.");
      } else {
        console.error("Đăng nhập thất bại:", error);
        setError("Đã xảy ra lỗi không xác định.");
      }
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
        <title>Đăng nhập - Admin</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Đăng nhập vào Admin</h1>
          <p className="text-center text-gray-600 mb-6">Chỉ dành cho admin của trang web đăng nhập</p>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"} // Nếu showPassword là true, hiển thị mật khẩu
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái hiển thị mật khẩu
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />} 
            </button>
          </div>

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

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đăng nhập
          </button>

          <p className="text-center text-gray-700 mt-4">
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Quên mật khẩu?
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
