// src/app/admin/login/LoginPage.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link từ Next.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";  // Firebase auth config

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);  // Trạng thái lỗi
  const [loading, setLoading] = useState(false);  // Trạng thái loading
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);  // Reset lỗi trước khi thử đăng nhập lại
    setLoading(true);  // Bắt đầu trạng thái loading

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");  // Chuyển hướng sau khi đăng nhập thành công
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Đăng nhập thất bại: " + error.message);  // Hiển thị lỗi cho người dùng
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    } finally {
      setLoading(false);  // Kết thúc trạng thái loading
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Mật khẩu" 
          required
        />
        {error && <p className="error-message">{error}</p>}  {/* Hiển thị thông báo lỗi */}

        <button type="submit" disabled={loading} className="login-button">
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {/* Sử dụng Link của Next.js để điều hướng */}
        <p className="forgot-password">
          <Link href="/forgot-password">Quên mật khẩu?</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
