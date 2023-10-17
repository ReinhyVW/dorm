import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from "./providers";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DORM App',
  description: 'Daily Operations Meeting for DHG Medical Centers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${roboto.className}`} >
      <body id='body' className='dark:from-default to-default-900 dark:bg-gradient-to-tr'>
        <div className='absolute -z-10' id="placeholder"></div>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
