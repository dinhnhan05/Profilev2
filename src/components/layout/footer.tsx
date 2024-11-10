"use client";

import { CalendarDays } from "lucide-react";
import Typography from "@/components/general/typography";
import { useEffect, useState } from "react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const dateString = now.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const timeString = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${dateString} - ${timeString}`); 
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer className="w-full bg-gray-50 py-6">
      <div className="flex items-center justify-center gap-1">
        <Typography className="flex items-center" variant="body3">
          <CalendarDays className="mr-1 inline-block h-4 w-4" />
          {currentTime}
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
