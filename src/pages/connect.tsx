import React from 'react'
import Container from './components/Container'
import MentorCard from './components/MentorCard'

export default function connect() {
  return (
    <Container>
    <div className='mt-32 flex flex-col justify-center items-center max-w-5xl w-full mx-auto mb-16 border-gray-200 dark:border-gray-700"'>
        <div className='mb-10'>
            <h1 className='text-gray-200 text-[5rem]'>Your matches with Mentors</h1>
        </div>
        {/* maping from database */}
        <div className='flex w-full items-center'>
        <MentorCard name={"Some Name"} degree={"Some Degree"} imgSrc={undefined} description={"This is description"}/>
        </div>
    </div>
    </Container>
  )
}
