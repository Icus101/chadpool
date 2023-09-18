import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "nes.css/css/nes.min.css";
import { WagmiProvider } from './components/WagmiContext';

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CHAD OF POOL',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className=''>
        <WagmiProvider>
          {children}
        </WagmiProvider></body>
    </html>

  )
}
