// src/pages/logout.tsx
"use client";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // Đảm bảo rằng auth đã được cấu hình đúng trong firebase.ts

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        // Sau khi đăng xuất thành công, chuyển hướng về trang login
        router.push("/login");
      } catch (error) {
        console.error("Error during logout", error);
      }
    };

    logout();
  }, [router]);

  return <div>Đang đăng xuất...</div>;
};

export default LogoutPage;
