"use client";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";  // Đảm bảo rằng bạn đã cấu hình Firebase đúng
import Typography from "@/components/general/typography";
import spaceGrotesk from "@/components/general/space-grotesk-font";

function AdminStatus() {
  const [status, setStatus] = useState("Đang cập nhật...");
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Theo dõi thay đổi trạng thái admin trong Firestore
    const docRef = doc(db, "adminStatus", "status");

    // Sử dụng onSnapshot để theo dõi thay đổi trạng thái admin
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Nếu admin đang online (isOnline = true), hiển thị "Đang hoạt động"
        if (data.isOnline) {
          setStatus("Đang hoạt động");
          setIsOnline(true);
        } else {
          // Nếu admin không online, hiển thị thời gian hoạt động trước đó
          const timeAgo = calculateTimeAgo(data.lastActive.toDate());
          setStatus(`Hoạt động ${timeAgo}`);
          setIsOnline(false);
        }
      }
    });

    // Clean-up khi component bị unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Hàm tính thời gian đã qua kể từ khi admin không hoạt động
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

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center">
        <span className="relative flex h-3 w-3">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOnline ? "animate-ping bg-emerald-400" : "bg-yellow-400"
            }`}
          ></span>
          <span
            className={`relative inline-flex h-3 w-3 rounded-full ${
              isOnline ? "bg-emerald-500" : "bg-yellow-500"
            }`}
          ></span>
        </span>
      </div>
      <Typography className={`${spaceGrotesk.className} text-lg`}>
        {status}
      </Typography>
    </div>
  );
}

export default AdminStatus;
