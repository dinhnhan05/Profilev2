// src/pages/admin.tsx
"use client";
import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";  // Cấu hình Firebase
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";  // Đảm bảo rằng auth đã được cấu hình đúng trong firebase.ts
import Link from "next/link"; // Import Link của Next.js

const AdminPage = () => {
  const [status, setStatus] = useState("Đang cập nhật...");
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);  // Thêm trạng thái loading
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi truy cập vào trang admin
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");  // Chuyển hướng về trang login nếu chưa đăng nhập
      } else {
        setLoading(false);  // Người dùng đã đăng nhập, tiếp tục tải dữ liệu
      }
    });

    return () => {
      unsubscribeAuth();  // Dọn dẹp khi component unmount
    };
  }, [router]);

  useEffect(() => {
    if (loading) return;  // Nếu đang tải, không làm gì thêm
    const docRef = doc(db, "adminStatus", "status");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.isOnline) {
          setStatus("Đang hoạt động");
          setIsOnline(true);
        } else {
          const timeAgo = calculateTimeAgo(data.lastActive.toDate());
          setStatus(`Hoạt động ${timeAgo}`);
          setIsOnline(false);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [loading]);

  const calculateTimeAgo = (lastActive: Date) => {
    const diff = Date.now() - lastActive.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} năm trước`;
    if (months > 0) return `${months} tháng trước`;
    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return "vài giây trước";
  };

  const updateAdminStatus = async (isOnline: boolean) => {
    const docRef = doc(db, "adminStatus", "status");

    if (!isOnline) {
      const currentTime = new Date();
      await updateDoc(docRef, {
        isOnline: false,
        lastActive: currentTime,
      });
    } else {
      await updateDoc(docRef, {
        isOnline: true,
        lastActive: null,
      });
    }
  };

  const handleOnlineClick = () => {
    setIsOnline(true);
    setStatus("Đang hoạt động");
    updateAdminStatus(true);  // Cập nhật trạng thái online trong Firestore
  };

  const handleOfflineClick = () => {
    setIsOnline(false);
    setStatus("Đang offline");
    updateAdminStatus(false);  // Cập nhật trạng thái offline trong Firestore
  };

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);  // Đăng xuất
      router.push("/login");  // Chuyển hướng về trang login
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  if (loading) return <div className="text-center p-4">Đang tải...</div>;  // Hiển thị khi trang đang tải

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <p className="text-lg text-gray-700 mb-4">{status}</p>
      <div className="space-x-4 mb-6">
        {/* Hai nút online và offline */}
        <button
          onClick={handleOnlineClick}
          disabled={isOnline}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg disabled:bg-gray-400 transition duration-300"
        >
          Chế độ Online
        </button>
        <button
          onClick={handleOfflineClick}
          disabled={!isOnline}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg disabled:bg-gray-400 transition duration-300"
        >
         Chế độ Offline
        </button>
      </div>
      {/* Nút logout */}
      <div>
        <button
          onClick={handleLogoutClick}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Nút Quay về trang chủ */}
      <Link href="/" className="absolute top-5 left-7 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default AdminPage;
