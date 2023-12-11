'use client';
import { fontSans } from '@/config/fonts';
import '@/styles/globals.css';
import { clsx } from 'clsx';
import { Providers } from './providers';

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'white' },
//     { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
//   icons: {
//     icon: '/favicon.ico',
//     shortcut: '/favicon-16x16.png',
//     apple: '/apple-touch-icon.png',
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          'min-h-screen  font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className="flex min-h-screen justify-center ">
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
