import React from 'react'
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
     <Analytics />
     <SessionProvider session={session}>
      <ThemeProvider attribute="class">
          <Component {...pageProps} />
         
      </ThemeProvider>
    </SessionProvider>
    </>
  );
}
