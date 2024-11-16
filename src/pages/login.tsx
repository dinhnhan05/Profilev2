"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Thêm icon cho mắt
import HCaptcha from '@hcaptcha/react-hcaptcha'; // Import HCaptcha
import toast from "react-hot-toast"; // Import react-hot-toast

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); // Thêm message cho thông báo thành công
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const [isCaptchaValid, setIsCaptchaValid] = useState(false); // Trạng thái CAPTCHA hợp lệ
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

  // Kiểm tra xem CAPTCHA đã được xác minh chưa
  if (!isCaptchaValid) {
    setError("Vui lòng xác minh rằng bạn không phải là robot.");
    toast.error("Vui lòng xác minh CAPTCHA!"); // Thông báo lỗi
    return;
  }

  // Reset thông báo lỗi và thành công
  setError(null);
  setMessage(null);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    setMessage("Đăng nhập thành công!");
    toast.success("Đăng nhập thành công!"); // Thông báo thành công
    router.push("/admin");
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Đăng nhập thất bại:", error.message);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.");
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu."); // Thông báo lỗi
    } else {
      console.error("Đăng nhập thất bại:", error);
      setError("Đã xảy ra lỗi không xác định.");
      toast.error("Đã xảy ra lỗi không xác định.");
    }
  }
};


  const onCaptchaVerify = (token: string) => {
    if (token) {
      setIsCaptchaValid(true);
      setError(null);
    } else {
      setIsCaptchaValid(false);
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

      <a href="/" className="absolute top-5 left-7 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Quay về trang chủ
      </a> 

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

          {/* hCaptcha */}
          <div className="mb-4 hcaptcha-container">
            <HCaptcha
              sitekey="c22061b6-26f6-4976-9b0a-4f0af244320c" // Thay bằng site key của bạn
              onVerify={onCaptchaVerify}
            />
          </div>

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
