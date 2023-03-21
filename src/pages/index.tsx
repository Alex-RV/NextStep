import Head from "next/head";
import Image from "next/image";
// import styles from '@/styles/Home.module.css'
import Container from './components/Container'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import NextLink from 'next/link';

fetch('createFromDB')
.then(response => response.text()) 
.then(textString => {
    console.log(textString);
});


export default function Home() {
  const { data: session } = useSession();
  return (
    <Container 
    title="Next Step"
    description="Home page">
      <div className='mt-32 flex flex-col justify-start items-start max-w-5xl w-full mx-auto mb-16 border-gray-200 dark:border-gray-700"'>
        <div className='flex flex-col'>
          <h1 className='text-gray-200 text-[10rem]'>NEXT STEP</h1>
        </div>
        <div className='flex flex-col'>
          <div className=''>
            <p className='italic text-gray-200 text-[1.2rem]'>
            Next Step is a platform that gives users the opportunity to explore and connect with  professionals, world-wide. By creating a profile with your unique interest and goals, Next Step will match you with recommended professional to find your potential mentor. Next Steps goal is to help you find your Next Step in life.            </p>
          </div>
          <div className='flex flex-row text-gray-200 mt-5'>
            <NextLink href={!session ? "/api/auth/signin" : "/profile"} className='bold text-[1.5rem] border-gray-200 border-2 p-[0.5rem]'>Try Next Step</NextLink>
            <NextLink href={'https://github.com/Alex-RV/NextStep'} className='bold text-[1.5rem] p-[0.5rem] pl-5 underline'>Learn More</NextLink>
          </div>
        </div>
      </div>
      
    </Container>
  )
}
