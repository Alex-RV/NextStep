import React from 'react'
import Container from './components/Container'
import { useSession, signIn, signOut } from 'next-auth/react';

export default function login() {
  return (
    <Container 
    title="Login Nest Step"
    description="Logn Page">
      <div className='mt-32 flex flex-col justify-start items-center max-w-5xl w-full mx-auto mb-16 border-gray-200 dark:border-gray-700"'>
        <div className='flex flex-col '>
          <h1 className='text-gray-200 text-[3rem]'>Login via Google</h1>
        </div>
        <div className='flex flex-col'>
        <form method="POST" action="/api/auth/signin/google">
            <button type="submit">Sign in with Google</button>
        </form>
        </div>
      </div>
      
    </Container>
  )
}
