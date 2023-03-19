import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function MentorCard({name, degree, imgSrc, description}) {
  return (
    <Link href={''}>
    <div className='flex min-w-[30rem] flex-col items-start mb-5 p-5 bg-white dark:bg-[#18222d] shadow-2xl rounded-2xl dark:shadow-transparent'>
        <div className='flex flex-row'>
            <div className=' mr-10'>
                <Image className='' width={200} height={200} src={imgSrc == undefined ? "/image.png" : imgSrc} alt={name}/>
            </div>
            <div className='flex flex-col w-full'>
                <div className='text-gray-500 bold text-[2rem] m-3'>
                    {name}
                </div>
                <div className='text-gray-500 italic text-[1.5rem] m-3'>
                    {degree}
                </div>
            </div>
        </div>
        <div className='flex text-gray-500 text-[1rem] m-3'>
            <p>{description}</p>
        </div>
    </div>
    </Link>
  )
}
