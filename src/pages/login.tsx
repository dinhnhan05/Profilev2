"use client";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiEye, HiEyeOff } from "react-icons/hi";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import toast from "react-hot-toast";
import gsap from "gsap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); 
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const router = useRouter();

  const containerRef = useRef(null);
  const homeRef = useRef(null);
  const titleRef = useRef(null);
  const noteRef = useRef(null);
  const forgotpassRef = useRef(null);
  const formFieldsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 200 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power4" }
    )
      .fromTo(
        homeRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" },
        "-=0.8"
      )
      .fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
        "-=0.5"
      )
      .fromTo(
        noteRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
        "-=0.3"
      )
      .fromTo(
        formFieldsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 0.6, ease: "power4.out" },
        "-=0.3"
      )
      .fromTo(
        forgotpassRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "elastic" },
        "+=0.5"
      );
  }, []);

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

    // Xóa tất cả các toast trước đó
    toast.dismiss();

    // Kiểm tra các trường hợp cụ thể
    if (!email && !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      toast.error("Vui lòng nhập email và mật khẩu.");
      return;
    }

    if (!email) {
      setError("Vui lòng nhập email.");
      toast.error("Vui lòng nhập email.");
      return;
    }

    if (!password) {
      setError("Vui lòng nhập mật khẩu.");
      toast.error("Vui lòng nhập mật khẩu.");
      return;
    }

    // Kiểm tra email có hợp lệ không
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Vui lòng nhập email hợp lệ (ví dụ: example@mail.com).");
      toast.error("Vui lòng nhập email hợp lệ (ví dụ: example@mail.com).");
      return;
    }

    // Kiểm tra CAPTCHA
    if (!isCaptchaValid) {
      setError("Vui lòng xác minh rằng bạn không phải là robot.");
      toast.error("Vui lòng xác minh CAPTCHA.");
      return;
    }

    setError(null);
    setMessage(null);

    // Thực hiện đăng nhập
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Đăng nhập thành công!");
      toast.success("Đăng nhập thành công!");
      router.push("/admin");
    } catch (error: any) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.");
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.");
    }
  };


  const onCaptchaVerify = (token: string) => {
    setIsCaptchaValid(!!token);
    if (!token) {
      setError("Vui lòng xác minh rằng bạn không phải là robot.");
      toast.error("Vui lòng xác minh CAPTCHA lại!");
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập - Admin</title>
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        {/* Link quay về */}
        <div ref={homeRef} className="absolute top-5 left-7">
          <Link
            href="/"
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Quay về trang chủ
          </Link>
        </div>

        {/* Form */}
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96"
          noValidate>

            <h1
              ref={titleRef}
              className="text-2xl font-bold text-center text-gray-900 mb-4"
            >
              Đăng nhập vào Admin
            </h1>
            <p ref={noteRef} className="text-center text-gray-600 mb-6">
              Chỉ dành cho admin của trang web đăng nhập
            </p>

            <div
              ref={(el) => (formFieldsRef.current[0] = el)}
              className="mb-4"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div
              ref={(el) => (formFieldsRef.current[1] = el)}
              className="mb-6 relative"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>

            <div
              ref={(el) => (formFieldsRef.current[2] = el)}
              className="mb-4 w-full flex justify-center"
            >
              <HCaptcha
                sitekey="c22061b6-26f6-4976-9b0a-4f0af244320c"
                onVerify={onCaptchaVerify}
              />
            </div>

            <button
              ref={(el) => (formFieldsRef.current[3] = el)}
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
              Đăng nhập
            </button>

            <p ref={forgotpassRef} className="text-center text-gray-700 mt-4">
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