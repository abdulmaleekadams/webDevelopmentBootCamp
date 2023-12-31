import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../../components/header/header/Header';
import Footer from '../../components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Keeper App',
  description: 'Created by Adams',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
