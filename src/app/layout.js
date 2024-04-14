import localFont from 'next/font/local';

const sweimeatball = localFont({
  src: [
    {
      path: '../../public/fonts/SweiMeatballCJKtc-Regular.woff',
      weight: '400',
      style: 'normal',
    },    
    {
      path: '../../public/fonts/SweiMeatballCJKtc-Regular.woff2',
      weight: '400',
      style: 'normal',
    }
  ],  
});  


import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { AvatarProvider } from "@/contexts/AvatarContext";



export const metadata = {
  title: {
    default:"永蓮紙藝",
    template:"%s | 永蓮紙藝"
  },
  description: "為您製作充滿心意的祭祀用品",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sweimeatball.className}>
        <AvatarProvider>
          <div className="full-container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AvatarProvider>
      </body>
    </html>
  );
}
