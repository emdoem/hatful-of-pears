import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export const siteTitle = 'For a Hatful of Pears';


export const metadata: Metadata = {
  title: siteTitle,
  description: 'a swing dance competition app',
}

function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='mt-10 bg-indigo-200'>
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