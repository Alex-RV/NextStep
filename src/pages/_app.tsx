import React from 'react'
import '../styles/globals.css';

import { ThemeProvider } from 'next-themes';
// import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';

export default function App({
  Component,
  pageProps,
}) {
  return (
      <ThemeProvider attribute="class">
        <main>
          <Component {...pageProps} />
          <Analytics />
        </main>
      </ThemeProvider>
  );
}
