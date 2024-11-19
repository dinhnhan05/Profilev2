// src/pages/_app.tsx
import '../app/globals.css'; // Đảm bảo đã import globals.css
import { AppProps } from 'next/app';  // Import AppProps từ next/app
import { Analytics } from '@vercel/analytics/react';  // Vercel Analytics
import { SpeedInsights } from "@vercel/speed-insights/next" // Thêm dòng này
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />  {/* Render component tương ứng */}
            <Analytics />  {/* Hiển thị Vercel Analytics */}
            <SpeedInsights />
               <Toaster position="top-center" reverseOrder={false} />
        </>
    );
}

export default MyApp;