// src/pages/_app.tsx
import '../app/globals.css'; // Đảm bảo đã import globals.css
import { AppProps } from 'next/app';  // Import AppProps từ next/app
import { Analytics } from '@vercel/analytics/react';  // Vercel Analytics

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />  {/* Render component tương ứng */}
            <Analytics />  {/* Hiển thị Vercel Analytics */}
        </>
    );
}

export default MyApp;
