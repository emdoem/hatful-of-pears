import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'For a Hatful of Pears',
  description: 'a swing dance competition app',
}

function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-gray-200 min-h-full'>
      {children}
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}

// className={inter.className}