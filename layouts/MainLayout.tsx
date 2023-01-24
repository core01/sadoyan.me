import Header from '@/components/Header';
import { PropsWithChildren } from 'react';
import { Footer } from '@/components/Footer';

export default function MainLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col max-w-3xl min-h-screen mx-auto p-4">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
