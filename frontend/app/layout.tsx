import Link from "next/link";
import Image from "next/image";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen w-full bg-white overflow-hidden text-[#4A4E7E] antialiased">
        {/* SIDEBAR */}
        <aside className="w-30 bg-[#4A4E7E] flex flex-col items-center py-8 gap-10 z-30 shrink-0">
           {/* Navigation content... */}
        </aside>

        {/* MAIN STAGE */}
        <main className="relative flex-1 flex flex-col items-center justify-center p-12 overflow-hidden">
          {/* THE GLOW: Centralized radial gradient */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_rgba(242,193,209,0.3)_0%,_rgba(255,255,255,1)_70%)] pointer-events-none" />
          
          {/* CLOSE ICON: Fixed in top right across all sub-pages */}
          <Link href="/" className="absolute top-10 right-10 z-40 hover:rotate-90 transition-transform">
            <Image src="/icon_close.svg" width={40} height={40} alt="Close" />
          </Link>

          {/* PAGE CONTENT */}
          <div className="relative z-10 w-full max-w-5xl h-full flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}