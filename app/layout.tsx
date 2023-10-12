import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReCaptchaProvider } from "next-recaptcha-v3";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Share WeBe Eag Link",
  description: "Created by Peter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer />
        </body>
      </html>
    </ReCaptchaProvider>
  );
}
