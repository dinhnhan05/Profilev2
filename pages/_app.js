// pages/_app.js
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
    return (
        <>
            {/* Google Analytics */}
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=G-9D7D9TJ5FM`} // Thay G-XXXXXXXXXX bằng mã theo dõi của bạn
            />
            <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXXXXX', {
                          page_path: window.location.pathname,
                        });
                    `,
                }}
            />
            {/* Vercel Analytics */}
            <VercelAnalytics />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
