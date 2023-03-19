import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';
import NextImage from 'next/image'

import Footer from './Footer';
import MobileMenu from './MobileMenu';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import addData from './Database/Database'


function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-green-700 dark:text-gray-200'
          : 'font-normal text-green-900 dark:text-gray-400',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export const Login = (props:any) => {
  if (!props.isLoggedIn){
    return <NavItem href="/login" text="Login" />
  }
  return <NavItem href="/settings" text="Settings" />
}

export default function Container(props) {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);


  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Next Step',
    description: `Find your pathway`,
    type: 'website',
    ...customMeta
  };
  

  return (
    <div className="bg-gray-200 dark:bg-gray-900">
      <Head>
        <title>{meta.title}</title>
      </Head>
      <div className="flex flex-col justify-center px-8">
        <nav className="flex items-center justify-between w-full relative max-w-5xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-3 sm:pb-6  text-green-900 bg-gray-200  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          
          <div className="ml-[-0.60rem] flex-row">
            <MobileMenu />
            <NextImage className='rounded-full  md:inline-block ' width={50} height={50} src={'/logo.png'} alt={'logo'} />
            <NavItem href="/" text="Home" />
            {/* <NavItem href="/team" text="Team" /> */}
            {!session ? (
        <>
          
        </>
      ) : (<>
      <NavItem href="/profile" text="Profile" />
      <NavItem href="/connect" text="Connect" /></>
            )}
          </div>
          <div className='flex flex-row gap-3'> 
          {!session ? (
        <>

        </>
      ) : (<><h4 className='font-normal p-1 sm:px-3 sm:py-2 text-green-900 dark:text-gray-400'>Signed in as {session.user.name}</h4>
      <button onClick={() => signOut()}>Sign out</button></>
            )}
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-gray-800 dark:text-gray-200"
              >
                {resolvedTheme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
          </div>
        </nav>
      </div>
      <main
        id="skip"
        className="flex flex-col  px-8 bg-[#002e20] dark:bg-gray-900"
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
