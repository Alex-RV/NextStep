import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import { signOut, useSession } from 'next-auth/react';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-green-700'
          : 'font-normal text-green-900',
        ' nav-item hidden md:inline-block  rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function MobileMenu() {
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <>
            
            <input id="toggle" type="checkbox"/>
            
            <label className="toggle-container" htmlFor="toggle">
              <span className="button button-toggle"></span>
            </label>
            <nav className="nav">
              <NavItem href={"/"} text={"Home"}/>
              {/* <NextLink className='nav-item' href="/">Home</NextLink> */}
              {!session ? (
              <NavItem href={"/api/auth/signin"} text={"Login"}/>) : 
              (<>
              <NavItem href={"/profile"} text={"Profile"}/>
              <NavItem href={"/connect"} text={"Connect"}/>
              <h4 className='nav-item font-normal  text-green-900 dark:text-gray-400'>Signed in as {session.user.name}</h4>
              <button className='nav-item' onClick={() => signOut()}>Sign out</button>
              </>
            )}
              <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="nav-item w-9 h-9  flex items-center justify-center"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
                {resolvedTheme === 'dark' ? (
                  "Light Mode"
                ) : (
                  "Dark Mode"
                )}
            
          </button>
            </nav>
          
    </>
  );
}
