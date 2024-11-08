"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Typography from "@/components/general/typography";
import spaceGrotesk from "@/components/general/space-grotesk-font";

function AdminStatus() {
  const [status, setStatus] = useState("Đang cập nhật...");
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      const docRef = doc(db, "adminStatus", "status");
      const docSnap = await getDoc(docRef);

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
    };

    getStatus();

    const handleUnload = () => {
      updateDoc(doc(db, "adminStatus", "status"), {
        isOnline: false,
        lastActive: new Date(),
      });
    };

    updateDoc(doc(db, "adminStatus", "status"), {
      isOnline: true,
      lastActive: new Date(),
    });

    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

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

function calculateTimeAgo(lastActive: Date) {
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
}

export default AdminStatus;
