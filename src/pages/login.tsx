"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra nếu người dùng đã đăng nhập khi vào trang login
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin");  // Nếu người dùng đã đăng nhập, chuyển hướng tới trang admin
      }
    });

    // Dọn dẹp khi component unmount
    return () => {
      unsubscribeAuth();
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");  // Đặt lại lỗi trước khi đăng nhập
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");  // Chuyển hướng đến trang Admin Dashboard khi đăng nhập thành công
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Đăng nhập thất bại:", error.message);
        setError("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.");
      } else {
        console.error("Đăng nhập thất bại:", error);
        setError("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Đăng nhập vào Admin</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}  {/* Thêm lớp CSS cho màu chữ đỏ */}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
