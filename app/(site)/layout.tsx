import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "~/app/globals.css";
import { AppDescription, AppFullName, AppLogoBlendedGreen } from "./config";
import { cn } from "./utils";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/General/ScrollToTop";
import LayoutWrapper from "./components/LayoutWrapper";
import LatestAnnouncementBanner from "./components/LatestAnnouncementBanner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: AppFullName,
    template: `%s | ${AppFullName}`,
  },
  description: AppDescription,
  icons: "/CSA.ico",
  verification: {
    google: "ig20PaAR7MNSk40sGERlhCESaTn485W4pQqlNytLV0s",
  },
};

export const viewport: Viewport = {
  themeColor: AppLogoBlendedGreen,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "flex flex-col min-h-screen")}>
        <LayoutWrapper>
          <ScrollToTop />
          <LatestAnnouncementBanner />
          <NavBar />
          <div className="flex-1 bg-slate-100 dark:bg-slate-800">
            {children}
          </div>
          <Footer />
        </LayoutWrapper>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ANALYTICS_SITE_ID}
        />
      </body>
    </html>
  );
}
