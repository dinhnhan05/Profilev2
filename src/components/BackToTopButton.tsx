// src/components/BackToTopButton.tsx
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react'; // Hoặc FaChevronUp nếu bạn dùng React Icons

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true); // Hiển thị nút khi cuộn xuống 300px
      } else {
        setShowButton(false); // Ẩn nút khi cuộn lên
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`back-to-top-btn ${showButton ? 'show' : ''}`} // Thêm lớp 'show' khi nút cần hiển thị
      >
        <ChevronUp size={24} /> {/* Sử dụng icon ChevronUp từ Lucide */}
      </button>
    </>
  );
};

export default BackToTopButton;
