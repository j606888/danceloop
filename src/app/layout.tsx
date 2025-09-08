import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "@/store/provider";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from "react-hot-toast";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "DanceLoop Tainan",
  description: "Our great memories about dancing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
          <Providers>
            <Toaster position="bottom-center" 
              toastOptions={{
                success: {
                  iconTheme: {
                    primary: "#6784F6",
                    secondary: "#ffffff",
                  }
                }
              }}
            />
            {children}
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
