import './globals.css';
import type { Metadata } from 'next';
import { GameProvider } from '@/lib/game-context';
import { Navbar } from '@/components/ui/navbar';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Leveler - Gamified Productivity',
  description: 'Level up your life with gamified tasks and XP progression',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background">
        <GameProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </GameProvider>
      </body>
    </html>
  );
}
