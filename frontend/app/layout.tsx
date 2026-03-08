import type { Metadata } from "next";
import { Quicksand } from "next/font/google"; // Using a rounded font to match your design
import "./globals.css"; // THIS IS THE MOST IMPORTANT LINE
import Link from "next/link";
import Image from "next/image";

// Setup the font to match your "bubbly" design style
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "zen garden",
  description: "take better care of yourself to grow your zen garden",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.className} flex h-screen w-full bg-white overflow-hidden text-[#4A4E7E] antialiased`}>
        
        {/* SIDEBAR - Matches your Home Page.png mockup */}
        <aside className="w-32 bg-[#4A4E7E] flex flex-col items-center py-10 gap-8 z-30 shrink-0">
          <Link href="/">
            <Image src="/small_logo_icon_white.svg" width={50} height={50} alt="Logo" className="mb-4" />
          </Link>
          <nav className="flex flex-col gap-6 items-center">
             <Link href="/dashboard" className="hover:opacity-100 opacity-70 transition-opacity">
               <Image src="/icon_dashboard.svg" width={40} height={40} alt="Dashboard" />
             </Link>
             <Link href="/journal" className="hover:opacity-100 opacity-70 transition-opacity">
               <Image src="/icon_journal.svg" width={40} height={40} alt="Journal" />
             </Link>
             <Link href="/garden" className="hover:opacity-100 opacity-70 transition-opacity">
               <Image src="/icon_garden.svg" width={40} height={40} alt="Mind Garden" />
             </Link>
          </nav>
        </aside>

        {/* MAIN STAGE */}
        <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
          {/* THE GLOW: Centralized radial gradient */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_rgba(242,193,209,0.3)_0%,_rgba(255,255,255,1)_70%)] pointer-events-none" />

          {/* PAGE CONTENT */}
          <div className="relative z-10 w-full h-full flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}