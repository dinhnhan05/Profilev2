"use client";

import { useEffect } from "react"; // Chỉ import useEffect từ React
import { ToastContainer, toast } from "material-react-toastify"; // Import toast components
import "material-react-toastify/dist/ReactToastify.css"; // Import styles
import HeroSection from "@/components/sections/hero";
import ContactSection from "@/components/sections/contact";
import AboutMeSection from "@/components/sections/about-me";
import SkillsSection from "@/components/sections/skills";
import { motion, useScroll } from "framer-motion";
// import ProjectSection from '@/components/sections/project';
import BackToTopButton from "@/components/BackToTopButton";  // Import BackToTopButton

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Trigger toast promise when the page loads
  useEffect(() => {
    toast.promise(
      new Promise((resolve) =>
        setTimeout(() => {
          resolve("Hoàn thành, đã tải xong!");
        }, 5000)
      ),
      {
        pending: "Đang tải dữ liệu...",
        success: "Hoàn thành, đã tải xong!",
        error: "Lỗi tải dữ liệu.",
      }
    );
  }, []);

  return (
    <>
      <motion.div
        className="fixed z-20 transform origin-left top-200 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        style={{ scaleX: scrollYProgress }}
      />
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      {/* <ProjectSection />  */}
      <BackToTopButton />
      <ContactSection />
      <ToastContainer
      position="top-center"
      theme="light"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    </>
  );
}
