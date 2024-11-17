import React from 'react'
import CreateForm from '../dashboard/_components/CreateForm'
import { useUser } from '@clerk/nextjs'

function Hero() {
  const { user, isSignedIn } = useUser()
  return (
      <section className="">
    <div className="mx-auto max-w-screen-xl px-4 py-32 h-screen lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
         Create your Form 
          <strong className="font-extrabold text-red-700 sm:block"> In Seconds. </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed text-gray-700">
        Whether you're designing surveys, feedback forms, registration pages, or custom data collection tools, our platform leverages cutting-edge AI to make form creation easier, faster, and smarter.
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4 ">
          {isSignedIn&&<CreateForm/>}
         
  
        
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero
